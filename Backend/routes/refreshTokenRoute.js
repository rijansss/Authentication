const express = require("express");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/generateTokens");
const router = express.Router();

router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({
      _id: decoded.id,
      role: decoded.role,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

module.exports = router;
