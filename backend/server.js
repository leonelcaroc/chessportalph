import path from "path";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

connectDB();

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": [
        "https://chessportalph.org",
        "https://res.cloudinary.com/",

        "data:",
      ],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  })
);
app.disable("x-powered-by");

// const corsOptions = {
//   // origin: ["http://localhost:3000"],
//   origin: ["http://chessportal.org"],
//   credentials: true,
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(cors(corsOptions));

app.set("trust proxy", true); // important if behind Nginx or Cloudflare

app.use((req, res, next) => {
  // Your secret key stored safely in environment variables
  const frontendSecret = process.env.FRONTEND_SECRET;

  // Get the header from request
  const clientSecret = req.headers["x-meta"];

  console.log("client secret: ", clientSecret);

  // To persuade those used my backend server publicly
  // if (clientSecret !== frontendSecret) {
  //   console.warn(`Unauthorized access attempt from IP: ${req.ip}`);
  //   return res.status(429).json({
  //     success: false,
  //     message: "Too many requests, please try again later.",
  //     retryAfter: 60,
  //   });
  // }

  next();
});

app.use((req, res, next) => {
  const allowedIPs = [
    "127.0.0.1",
    "::1",
    "::ffff:127.0.0.1",
    "YOUR_SERVER_PUBLIC_IP", // e.g. 192.168.1.50 or external IP
  ];

  const clientIP = req.ip;

  if (!allowedIPs.includes(clientIP)) {
    console.warn(`Blocked IP attempt: ${clientIP}`);
    return res.status(403).json({ message: "Access denied" });
  }

  next();
});

app.use((req, res, next) => {
  const clientIP = req.ip;

  console.log(
    `Incoming request from: ${clientIP} -> ${req.method} ${req.originalUrl}`
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
