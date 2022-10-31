import { Router } from 'express';
import { createComment, getComments, deleteComment } from '../controllers/CommentController';
import verifyToken from '../middleware/VerifyToken';
const router = Router();

// get all comments
router.get('/:id', getComments)
// add a comment
router.post('/:id', verifyToken, createComment)


// delete a comment
router.delete('/:id', verifyToken, deleteComment);

export default router;