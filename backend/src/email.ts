import express from "express";

const router = express.Router();

router.post("/contact-us", (req, res) => {
  res.status(200).send("You are posting to /email/contact-us");
});

export default router;
