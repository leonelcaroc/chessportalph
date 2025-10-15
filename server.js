import path from "path";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./backend/config/db.js";
import {
  notFound,
  errorHandler,
} from "./backend/middleware/errorMiddleware.js";
import userRoutes from "./backend/routes/userRoutes.js";
import searchRoutes from "./backend/routes/searchRoutes.js";
import adminRoutes from "./backend/routes/adminRoutes.js";
import settingsRoutes from "./backend/routes/settingsRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Trust proxy for real IPs
app.set("trust proxy", true);

// ✅ Define allowed origins
const allowedOrigins = ["http://localhost:5173", "https://chessportalph.org"];

// ✅ Setup CORS first!
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Meta"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));
// ✅ Handle preflight requests immediately
app.options("*", cors(corsOptions));

// --- Now continue with your other middlewares ---
app.use(helmet());
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rate limiter
const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Sumosobra kana" },
});
app.use(apiLimiter);

// ✅ Blocklist and bot filter
const blocklist = new Set(["167.99.182.39"]);

app.use((req, res, next) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
  const ua = req.get("User-Agent") || "";

  if (blocklist.has(ip)) return res.status(429).send("Too many requests");
  if (/l9scan|leakix|Go-http-client|HeadlessChrome/i.test(ua))
    return res.status(429).send("Too many requests");

  next();
});

// ✅ Your frontend secret check (AFTER CORS!)
app.use((req, res, next) => {
  const frontendSecret = process.env.FRONTEND_SECRET;
  const clientSecret = req.headers["x-meta"];

  if (req.method === "OPTIONS") return next(); // Allow preflight

  if (clientSecret !== frontendSecret) {
    console.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
      retryAfter: 60,
    });
  }

  next();
});

app.use((req, res, next) => {
  console.log(
    `Incoming request from: ${req.ip} -> ${req.method} ${req.originalUrl}`
  );
  next();
});

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Backend Server is running on port ${process.env.PORT}`);
});
