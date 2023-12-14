import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  name: String,
  description: String,
  thumbnail: String,
  sourceUrl: String,
});

const MediaModel = mongoose.model("Media", MediaSchema);

export default MediaModel;
