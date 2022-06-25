import axios from "axios";
import { IPostFormData } from "../types/Post";

export const fetchPosts = () => axios.get("/api/v1/posts");
export const createPost = (formData: IPostFormData) =>
  axios.post("/api/v1/posts", formData);
export const updatePost = (id: string, formData: any) =>
  axios.patch(`/api/v1/posts/${id}`, formData);
export const deletePost = (id: string) => axios.delete(`/api/v1/posts/${id}`);
