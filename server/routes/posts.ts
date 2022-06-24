import { createPost, getPosts } from "../controllers/posts";
import express from "express";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
