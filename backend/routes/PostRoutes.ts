import { Router } from "express";
import upload from "../config/imageUpload";
import { createPost, getNews, deletePost, editPost, getPost, getUserPostsInterest, likeDislikePost, saveAndUnSavePost, searchPosts, getUserPosts } from "../controllers/PostController";
import verifyToken from "../middleware/VerifyToken";

const router = Router();

// search posts
router.get('/search', verifyToken, searchPosts);
// get all posts user
router.get('/user/:id', verifyToken, getUserPosts);

// get for you posts with (selected categories )
router.get('/interest', verifyToken, getUserPostsInterest);


// get a posts
router.get('/:id', getPost);

router.get('/news/:id', getNews);

// edit post
router.put('/:id', upload.single('image'), verifyToken, editPost);

// like and dislike
router.put('/like/:id', verifyToken, likeDislikePost);

// save and unsave post
router.put('/save/:id', verifyToken, saveAndUnSavePost);

// create a post
router.post('/', upload.single('image'), verifyToken, createPost);

// delete post
router.delete('/:id', verifyToken, deletePost);
export default router;