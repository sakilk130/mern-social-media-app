import axios from "axios";
import { IPostFormData, IQuery } from "../types/Post";

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "").token
    }`;
  }
  return req;
});

export const getSignIn = (formData: any) =>
  axios.post("/api/v1/user/signin", formData);

export const getSignUp = (formData: any) =>
  axios.post("/api/v1/user/signup", formData);

export const fetchPosts = (page: number) =>
  axios.get(`/api/v1/posts?page=${page || 1}`);

export const getPostById = (id: any) => axios.get(`/api/v1/posts/${id}`);

export const createPost = (formData: IPostFormData) =>
  API.post("/api/v1/posts", formData);

export const updatePost = (id: string, formData: any) =>
  API.patch(`/api/v1/posts/${id}`, formData);

export const deletePost = (id: string) => API.delete(`/api/v1/posts/${id}`);

export const likePost = (id: string) => API.patch(`/api/v1/posts/like/${id}`);

export const getPostBySearch = (searchQuery: IQuery) =>
  API.get(
    `/api/v1/posts/search?query=${searchQuery.query}&tags=${searchQuery.tags}`
  );

export const commentPost = ({ id, comment }: any) =>
  API.patch(`/api/v1/posts/comment/${id}`, { comment });
