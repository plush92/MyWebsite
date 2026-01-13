//to run, cd into the backend file and run node src/contactform/contactform.js

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * POST /contact
 * Expects: { email, phone, comment }
 * Sends an email with the form data.
 */
app.post("/contact", (req, res) => {
  const { name, email, phone, comment } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email required." });
  }

  // Compose the email
  const mailOptions = {
    from: email || process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${comment}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send error:", error);
      return res.status(500).send("Failed to send email.");
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
