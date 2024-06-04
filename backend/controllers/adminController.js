import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    return res
      .status(200)
      .json({ status: "success", message: "Successfully login!" });
  } else {
    res
      .status(401)
      .json({ status: "error", message: "Invalid email or password" });

    throw new Error("Invalid email or password.");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // const email = "leonelcaroc25@gmail.com";
  // const email = "ycppap.inc@yahoo.com";
  // const password = "123123123";

  const userExists = await Admin.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await Admin.create({
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      message: "Account created",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

const getAdminProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const user = await Admin.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);

    throw new Error("User not found");
  }

  res.status(200).json({ message: "Update user profile" });
});

export {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
};
