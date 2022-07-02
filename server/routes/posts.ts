import {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  deletePost,
  likePost,
  searchPost,
} from "../controllers/posts";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/search", searchPost);
router.get("/", getPosts);
router.get("/:id", getPostsById);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/like/:id", auth, likePost);

export default router;
