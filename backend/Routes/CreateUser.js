const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret =
  "IAm Maaz a dedicated student of UET Mardan and a fullstack software developer and DevOps engineer";

// Route to create a user
router.post(
  "/createuser",
  [
    body("email", "Invalid email format").isEmail(),
    body("name", "Name must be at least 5 characters").isLength({ min: 5 }),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // Check if user already exists
      let userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      // Create user
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location || "",
      });

      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Route to login user
router.post(
  "/loginuser",
  [
    body("email", "Invalid email format").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Find user by email
      const userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Compare passwords
      const pwdCompare = await bcrypt.compare(password, userData.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Generate JWT token
      const payload = { user: { id: userData.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ success: true, authToken });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

module.exports = router;
