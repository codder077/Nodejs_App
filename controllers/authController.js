const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err); // Log error details
    res.status(400).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwtUtils.generateAccessToken(user);
    const refreshToken = jwtUtils.generateRefreshToken(user);
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(403);
  
    const user = jwtUtils.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!user) return res.sendStatus(403);
  
    const accessToken = jwtUtils.generateAccessToken(user);
    res.json({ accessToken });
  };
