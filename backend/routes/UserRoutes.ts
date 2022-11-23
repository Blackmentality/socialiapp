import { Router } from 'express';
import upload from '../config/imageUpload';
import { changeProfileImg, editUserProfile, getUserById } from '../controllers/UserController';
import verifyToken from '../middleware/VerifyToken';

const router = Router();


// Get User by Id
router.get('/:id', getUserById);

// Edit User Profile
router.post('/edit-profile/:id', verifyToken, editUserProfile);

// Change Banner / Profile Img
router.post('/change-img/:id/:type', upload.single('image'), verifyToken, changeProfileImg);


export default router;