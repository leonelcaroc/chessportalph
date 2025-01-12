import asyncHandler from "express-async-handler";
import Search from "../models/searchQueryModel.js";
import Joi from "joi";

// desc     Search player/s
// route    GET /api/search
// @access  Public
const getSearchPlayer = asyncHandler(async (req, res) => {
  const { limit = 10, query, firstname, lastname, localId, title } = req.query;
  let { page = 1 } = req.query;
  let gender = req.query.gender;
  const isAdvanceSearch = req.query.isAdvanceSearch === "true";

  const schema = Joi.object({
    page: Joi.number().required().min(0),
    limit: Joi.number().required().min(10),
    isAdvanceSearch: Joi.boolean().required(),
    query: Joi.string().allow("").when("isAdvanceSearch", {
      is: false,
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    query: Joi.string().allow("").optional(),
    firstname: Joi.string().allow("").optional(),
    lastname: Joi.string().allow("").optional(),
    localId: Joi.string().allow("").optional(),
    gender: Joi.string().valid("male", "female", "").optional(),
    title: Joi.string().allow("").optional(),
  });

  const { error } = schema.validate({
    page,
    limit,
    isAdvanceSearch,
    query,
    firstname,
    lastname,
    localId,
    gender,
    title,
  });
  if (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }

  if (page < 1) {
    page = 1;
  }

  let defaultQuery = {};

  if (isAdvanceSearch) {
    if (gender === "male") {
      gender = "";
      defaultQuery.SEX = gender;
    } else if (gender === "female") {
      gender = "F";
      defaultQuery.SEX = gender;
    }

    if (firstname) {
      defaultQuery.NAME = { $regex: firstname, $options: "i" };
    }
    if (lastname) {
      defaultQuery.SURNAME = { $regex: lastname, $options: "i" };
    }
    if (localId) {
      defaultQuery.ID_No = { $regex: localId, $options: "i" };
    }
    if (title) {
      defaultQuery.TITLE = title.toUpperCase();
    }
  } else {
    defaultQuery = {
      $or: [
        { SURNAME: { $regex: query, $options: "i" } },
        { NAME: { $regex: query, $options: "i" } },
        { ID_No: { $regex: query, $options: "i" } },
      ],
    };
  }

  // console.log(defaultQuery);

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
    res.status(500).json({ error: "An error occurred" });
  }
});

export { getSearchPlayer };
