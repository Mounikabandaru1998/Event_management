import db from '../models/index.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await db.Event.findAll({
      include: [{
        model: db.User,
        attributes: ['id', 'name', 'email']
      }]
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, date, description, userId } = req.body; // No type now
    const event = await db.Event.create({ title, date, description, userId });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};


export const updateEvent = async (req, res) => {
  const event = await db.Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  await event.update(req.body);
  res.json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await db.Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  await event.destroy();
  res.json({ message: 'Event deleted' });
};
