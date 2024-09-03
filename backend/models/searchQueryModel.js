import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
  ID_No: String,
  SURNAME: String,
  NAME: String,
});

const Search = mongoose.model("Septembers", searchSchema);

export default Search;
