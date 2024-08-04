import express from "express";

const router = express.Router();

router.post("/upload", (req, res) => {
  res.status(200).send("You are posting to /file/upload");
});

router.get("/list", (req, res) => {
  res.status(200).send("You are getting /file/list");
});

router.get("/download", (req, res) => {
  res.status(200).send("You are getting /file/download");
});

export default router;
