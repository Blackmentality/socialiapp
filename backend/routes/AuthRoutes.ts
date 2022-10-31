import { Router } from 'express';
import { forgotPassword, registerUser, verifyAndChangePassword, signInUser, logoutUser } from '../controllers/AuthController';
import { userValidate, validateError } from '../middleware/AuthValidator';
const router = Router();


// SignIn User
router.post('/signin', signInUser);

// Register User
router.post('/register', userValidate, validateError, registerUser);

// Forgot Password
router.post('/forgot-password', forgotPassword);

router.get('/logout', logoutUser);

// Verify password reset
router.get('/:id/password-reset/:token', verifyAndChangePassword);

router.get('/login/failed');




export default router;