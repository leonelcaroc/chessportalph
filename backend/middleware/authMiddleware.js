import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protectAdmin = asyncHandler(async (req, res, next) => {
  // let token;
  // token = req.cookies.jwt;

  // if (token) {
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //     req.user = await User.findById(decoded.userId).select("-password");

  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not authorized, invalid token");
  //   }
  // } else {
  //   res.status(401);
  //   throw new Error("Not authorized, no token");
  // }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401).json({ message: "No token provided." });
    throw new Error("Not authorized, no token");
  }
});

export { protectAdmin };
