import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: Number(process.env.EMAIL_PORT!),
    secure: process.env.EMAIL_SECURE! === "true",
    auth: {
      user: process.env.EMAIL_ADDRESS!,
      pass: process.env.EMAIL_PASSWORD!,
    },
    tls: { rejectUnauthorized: false },
  });
  try {
    await transporter.verify();
    return await transporter.sendMail({ from: process.env.EMAIL_ADDRESS!, to, subject, text });
  } catch (err) {
    throw err;
  }
}

router.post("/contact-us", async (req, res) => {
  const { email, name, message } = req.body;
  if (!email || !name || !message) {
    return res.status(422).send("Missing email, name, or message");
  }
  try {
    const result = await sendEmail(
      process.env.EMAIL_ADDRESS!,
      "Web Workshop Contact Us Form",
      `Message from ${name} <${email}>:\n\n${message}`,
    );
    if (result.accepted.length > 0) {
      res.status(200).send("Message sent successfully");
    } else {
      throw new Error("Failed to send message for unknown reason");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message");
  }
});

export default router;
