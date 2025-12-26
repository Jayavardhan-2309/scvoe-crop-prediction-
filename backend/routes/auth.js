import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { findUserByEmail, createUser } from "../models/User.js";

const router = express.Router();
const JWT_SECRET = "scvoe-secret"; // move to .env later

// ---------- SIGNUP ----------
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (findUserByEmail(email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = createUser({
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  });

  res.json({ message: "Signup successful" });
});

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email
    }
  });
});

export default router;
