import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post";

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page } = req.query;
    const totalPosts = await Post.countDocuments();
    const LIMIT = 10;

    const posts = await Post.find()
      .sort({ created_at: -1 })
      .skip((Number(page || 1) - 1) * LIMIT)
      .limit(LIMIT);

    res.status(200).json({
      success: true,
      data: {
        posts,
        currentPage: Number(page || 1),
        totalPages: Math.ceil(totalPosts / LIMIT),
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

const createPost = async (req: any, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const post = await Post.create({ ...data, creator: req.userId });
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

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({
        success: false,
        error: "Delete failed",
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

const likePost = async (req: Request & any, res: Response): Promise<any> => {
  try {
    const { id }: any = req.params;
    if (!req.userId) {
      res.status(401).json({
        success: false,
        error: "You must be logged in to like a post",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const post: any = await Post.findById(id);
    if (!post) {
      res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }
    const isAlreadyLiked: any = post.likes.some(
      (like: any) => like.toString() === req.userId
    );
    if (isAlreadyLiked) {
      post.likes = post.likes.filter(
        (like: any) => like.toString() !== req.userId
      );
      post.save();
    } else {
      post.likes.push(req.userId);
      await post.save();
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

const searchPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, tags }: any = req.query;
    const title = new RegExp(query, "i");

    const posts = await Post.find({
      $or: [{ title: { $regex: title } }, { tags: { $in: tags.split(",") } }],
    });
    if (!posts) {
      res.status(404).json({
        success: false,
        error: "No posts found",
      });
    }

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export { getPosts, createPost, updatePost, deletePost, likePost, searchPost };
