import db from '../models/index.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { role: 'user' } // Only get users, not admins
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
