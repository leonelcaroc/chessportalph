import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Search from "../models/searchQueryModel.js";
import Settings from "../models/settingsModel.js";
import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// desc     Update user profile
// route    PUT /api/users/profile
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//     });
//   } else {
//     res.status(404);

//     throw new Error("User not found");
//   }

//   res.status(200).json({ message: "Update user profile" });
// });

// desc     Get user profile
// route    GET /api/settings/settings
// @access  Private
const getGlobalSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.find({});

  res.status(200).json(settings[0]);
});

export {
  getGlobalSettings,
  //   updateUserProfile,
};
