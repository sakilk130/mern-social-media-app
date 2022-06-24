import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import postsRoutes from "./routes/posts";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/posts", postsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
