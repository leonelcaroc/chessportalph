import mongoose from "mongoose";

const searchSchema = mongoose.Schema({
  ID_No: String,
  SURNAME: String,
  NAME: String,
});

const Search = mongoose.model("Marchs", searchSchema);

export default Search;
