import express from 'express';
import { createChannel, getChannel, updateChannel, subscribeToChannel } from '../controllers/channels.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createChannel);
router.get('/:id', getChannel);
router.patch('/:id', auth, updateChannel);
router.post('/:id/subscribe', auth, subscribeToChannel);

export default router;