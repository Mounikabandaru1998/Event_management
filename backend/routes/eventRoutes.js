import { getAllEvents, createEvent, updateEvent } from '../controllers/eventController.js';

import express from 'express';
const router = express.Router();

// Routes
router.get('/', getAllEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);

export default router;
