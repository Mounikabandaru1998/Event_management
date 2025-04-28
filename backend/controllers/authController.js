import db from '../models/index.js';

export const login = async (req, res) => {
  try {
    const { email, role } = req.body;
    const user = await db.User.findOne({ where: { email, role } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Login error', error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await db.User.create({ name, email, role: 'user' });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Register error', error: error.message });
  }
};
