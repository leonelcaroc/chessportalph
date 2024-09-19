import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";
import Search from "../models/searchQueryModel.js";
import { ObjectId } from "mongodb";
import Joi from "joi";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // generateToken(res, user._id);
    const myToken = generateToken(res, user._id);
    return res.status(200).json({
      status: "success",
      message: "Successfully login!",
      adminInfo: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: myToken,
      },
    });
  } else {
    res
      .status(401)
      .json({ status: "error", message: "Invalid email or password" });

    throw new Error("Invalid email or password.");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  // const email = "leonelcaroc25@gmail.com";
  // const email = "ycppap.inc@yahoo.com";
  // const password = "123123123";
  // const firstName = "Edward";
  // const lastName = "Serrano";

  const userExists = await Admin.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await Admin.create({
    email,
    password,
    firstName,
    lastName,
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

const getPlayers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  if (page < 1) page = 1;

  const schema = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
    search: Joi.string().allow("").required(),
  });

  const { error } = schema.validate({ page, limit, search });
  if (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }

  let defaultQuery = {};
  if (search) {
    defaultQuery = {
      $or: [
        { SURNAME: { $regex: search, $options: "i" } },
        { NAME: { $regex: search, $options: "i" } },
        { ID_No: { $regex: search, $options: "i" } },
      ],
    };
  }

  const skip = (page - 1) * limit;

  try {
    const length = await Search.countDocuments({ ...defaultQuery });
    const items = await Search.find({ ...defaultQuery })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    const totalPage = Math.ceil(length / limit);

    res.status(200).json({
      items: items,
      page: page,
      totalPage: totalPage,
      totalItems: length,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

const getPlayerById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate({ id });
  if (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }

  const player = await Search.findOne({ _id: new ObjectId(id) });
  if (!player) {
    return res
      .status(404)
      .json({ status: "error", message: "Player is not existing." });
  }

  return res.status(200).json(player);
});

const updatePlayerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  function convertDate(dateString) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${month}/${day}/${year}`;
  }

  if (payload["B-day"]) {
    payload["B-day"] = convertDate(payload["B-day"]);
    payload["B-Year"] = payload["B-day"].split("/")[2];
  }

  const schema = Joi.object({
    id: Joi.string().hex().required(),
    payload: Joi.object({
      ID_No: Joi.string().required(),
      SURNAME: Joi.string().allow(""),
      NAME: Joi.string().required(),
      SEX: Joi.string().allow(""),
      "B-Year": Joi.string()
        .pattern(/^\d{4}$/)
        .allow(""),
      "B-day": Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .allow(""),
      Blitz: Joi.string().allow(""),
      "F-960": Joi.string().allow(""),
      Fed: Joi.string().allow(""),
      Fide_No: Joi.string().allow(""),
      Rapid: Joi.string().allow(""),
      STD_: Joi.string().allow(""),
      TITLE: Joi.string().allow(""),
    }).required(),
  });

  const { error, value } = schema.validate({ id, payload });
  if (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }

  if (value.payload.TITLE === "none") {
    payload.TITLE = "";
  }

  if (value.payload.SEX === "M") {
    payload.SEX = "";
  }

  if (value.payload["B-day"]) {
    value.payload["B-Year"] = value.payload["B-day"].split("/")[2];
  }

  try {
    const result = await Search.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload } }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Player not found." });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Player updated successfully." });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

export {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getPlayers,
  getPlayerById,
  updatePlayerById,
};
