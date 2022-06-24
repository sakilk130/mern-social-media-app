import axios from "axios";

export const fetchPosts = () => axios.get("/api/v1/posts");
