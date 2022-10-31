import { Router } from "express";
import { createPost, deletePost, editPost, getPost, getPostsbyCategory, getRandomPosts, likeDislikePost, saveAndUnSavePost, searchPosts } from "../controllers/PostController";
import verifyToken from "../middleware/VerifyToken";

const router = Router();


// get all posts
router.get('/random', getRandomPosts);

// search posts
router.get('/search', searchPosts);


// get a posts
router.get('/:id', getPost);

// get postd by tags
router.get('/tags', );


// get posts by category
router.get('/category/:id', getPostsbyCategory);

// edit post
router.put('/:id', verifyToken, editPost);

// like and dislike
router.put('/like/:id', verifyToken, likeDislikePost);

// save and unsave post
router.put('/save/:id', verifyToken, saveAndUnSavePost);

// create a post
router.post('/', verifyToken, createPost);

// delete post
router.delete('/:id', verifyToken, deletePost);
export default router;