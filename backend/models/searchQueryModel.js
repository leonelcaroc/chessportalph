import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
  _id: ObjectId,
  ID_No: String,
  SURNAME: String,
  NAME: String,
});

const Search = mongoose.model("Septembers", searchSchema);

export default Search;
