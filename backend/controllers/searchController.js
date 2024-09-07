import asyncHandler from "express-async-handler";
import Search from "../models/searchQueryModel.js";
import Joi from "joi";

// desc     Search player/s
// route    GET /api/search
// @access  Public
const getSearchPlayer = asyncHandler(async (req, res) => {
  const { limit = 10, query } = req.query;
  let { page = 1 } = req.query;
  // let customPage = 0;
  // if (page < 1) customPage = 1;

  const schema = Joi.object({
    page: Joi.number().required().min(0),
    limit: Joi.number().required().min(10),
    query: Joi.string().allow("").required(),
  });

  const { error } = schema.validate({ page, limit, query });
  if (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }

  if (page < 0) {
    page = 1;
  }

  let defaultQuery = {};
  if (query) {
    defaultQuery = {
      $or: [
        { SURNAME: { $regex: query, $options: "i" } },
        { NAME: { $regex: query, $options: "i" } },
        { ID_No: { $regex: query, $options: "i" } },
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
    res.status(500).json({ error: "An error occurred" });
  }
});

export { getSearchPlayer };
