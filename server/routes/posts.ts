import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/posts";
import express from "express";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
