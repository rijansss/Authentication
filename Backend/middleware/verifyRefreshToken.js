  const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token missing' });
  }

  try {
  
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);


    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: 'Refresh token invalid or blacklisted' });
    }


    req.user = user;
    req.tokenPayload = decoded; 

    next();

  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired refresh token', error: err.message });
  }
};

module.exports = verifyRefreshToken;
