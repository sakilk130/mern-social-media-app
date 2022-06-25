import axios from "axios";
import { IPostFormData } from "../types/Post";

export const fetchPosts = () => axios.get("/api/v1/posts");
export const createPost = (formData: IPostFormData) =>
  axios.post("/api/v1/posts", formData);
