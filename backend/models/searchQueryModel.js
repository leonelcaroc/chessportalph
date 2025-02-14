import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
  _id: ObjectId,
  ID_No: String,
  SURNAME: String,
  NAME: String,
  SEX: String,
  Fed: String,
  TITLE: String,
  STD_: String,
  Rapid: String,
  Blitz: String,
  "G-Title": String,
  "F-960": String,
  "B-day": String,
  "B-Year": String,
});

// const Search = mongoose.model("Search", searchSchema, "december");

// export default Search;

const createSearchModel = (collectionName) => {
  return mongoose.model(
    `Search_${collectionName}`,
    searchSchema,
    collectionName
  );
};

export default createSearchModel;
