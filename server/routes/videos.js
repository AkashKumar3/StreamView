import express from 'express';
import { getVideos, getVideo, createVideo } from '../controllers/videos.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getVideos);
router.get('/:id', getVideo);
router.post('/', auth, createVideo);

export default router;