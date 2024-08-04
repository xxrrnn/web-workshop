import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.status(200).send("You are posting to /user/login");
});

router.post("/register", (req, res) => {
  res.status(200).send("You are posting to /user/register");
});

export default router;
