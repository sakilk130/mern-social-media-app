import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selected_file: String,
  likes: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export default model("Post", PostSchema);
