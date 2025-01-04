import express from 'express';
import { getVideoComments, createComment, updateComment, deleteComment } from '../controllers/comments.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/video/:videoId', getVideoComments);
router.post('/video/:videoId', auth, createComment);
router.patch('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

export default router;