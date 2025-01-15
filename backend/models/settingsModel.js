import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const settingsSchema = mongoose.Schema({
  _id: ObjectId,
  month: String,
  year: String,
  monthList: {
    type: [String],
    default: [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
  },
  titles: {
    type: [String],
    default: [
      "NM",
      "CM",
      "FM",
      "IM",
      "GM",
      "WCM",
      "WFM",
      "WIM",
      "WGM",
      "ACM",
      "AFM",
      "AIM",
      "AGM",
    ],
  },
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
