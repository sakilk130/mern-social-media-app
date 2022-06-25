import { createPost, getPosts, updatePost } from "../controllers/posts";
import express from "express";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;
