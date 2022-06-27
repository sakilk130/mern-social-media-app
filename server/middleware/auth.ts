import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: any, _: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const tokenLength = token.length < 500;
    let decoded: any;

    if (tokenLength && token) {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      req.userId = decoded?.id;
    } else {
      decoded = jwt.decode(token);

      req.userId = decoded?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
