import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.json("Hello World!");
});

export default router;
