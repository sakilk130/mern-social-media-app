import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signin = async (req: Request, res: Response): Promise<any> => {
  const { email, password }: any = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string
    );
    return res.status(200).json({ success: true, user: user, token });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const signup = async (req: Request, res: Response): Promise<any> => {
  const { first_name, last_name, email, password }: any = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      process.env.PASSWORD_SALT as string
    );
    const newUser = new User({
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string
    );
    return res.status(200).json({ success: true, user: newUser, token });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
