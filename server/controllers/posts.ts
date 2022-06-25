import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post";

const getPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!post) {
      res.status(404).json({
        success: false,
        error: "Update failed",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { getPosts, createPost, updatePost };
