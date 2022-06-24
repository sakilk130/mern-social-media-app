import { Request, Response } from "express";
import Post from "../models/Post";

const getPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
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

export { getPosts, createPost };
