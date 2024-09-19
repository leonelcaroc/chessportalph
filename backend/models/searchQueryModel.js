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
  "F-960": String,
  "B-day": String,
  "B-Year": String,
});

const Search = mongoose.model("Septembers", searchSchema);

export default Search;
