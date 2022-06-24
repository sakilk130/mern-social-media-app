import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selected_file: String,
  like_count: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

export default model("Post", PostSchema);
