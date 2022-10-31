import { sendError } from './../utils/helper';
import UserModel from '../models/User';
import { Request, Response } from 'express';
import PostModel from '../models/Post';


const pageLimit = 20;
// create a post
const createPost = async (req: any, res: any, next: any) => {
    const userId = req.uData.id;

    try {
        const newPost = new PostModel({
            ...req.body, owner: userId
        })
        const post = await newPost.save();
        const user = await UserModel.findById(userId);
        await user?.updateOne({ $inc: { post_counts: 1 } });
        res.status(200).json({ message: 'created post', success: true, data: post });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// delete a post
const deletePost = async (req: any, res: any, next: any) => {
    const postId = req.params.id;
    const userId = req.uData.id;
    try {
        const getPost = await PostModel.findById(postId);
        const user = await UserModel.findById(userId);
        if (!getPost) return next(sendError(res, 404, 'Post not found'));

        if (getPost?.owner !== userId) {
            return next(sendError(res, 403, `You can only delete your post`))
        } else {
            await PostModel.findOneAndDelete({ _id: postId });
            await user?.updateOne({ $inc: { post_counts: -1 } });
            res.status(200).json({ message: 'Deleted post', success: true });
        }
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// edit a post
const editPost = async (req: any, res: any, next: any) => {
    const postId = req.params.id;
    const userId = req.uData.id;
    try {
        const getPost = await PostModel.findById(postId);
        if (getPost?.owner !== userId) {
            return next(sendError(res, 403, `You can only edit your post`))
        } else {
            const updatePost = await PostModel.findOneAndUpdate({ _id: postId }, {
                $set: {
                    ...req.body
                }
            }, { new: true });
            res.status(200).json({ message: 'Updated post', success: true, data: updatePost });
        }
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// get a post
const getPost = async (req: Request, res: any, next: any) => {
    const postId = req.params.id;
    try {

        const post = await PostModel.findById(postId);
        if (!post) return next(sendError(res, 404, 'Post not found'));

        res.status(200).json({ message: 'got post', data: post, success: true });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// like and dislike
const likeDislikePost = async (req: any, res: any, next: any) => {
    const postId = req.params.id;
    const userId = req.uData.id;

    try {
        const getPost = await PostModel.findById(postId);
        if (!getPost?.likes.includes(userId)) {
            await getPost?.updateOne({ $push: { likes: userId } });
            await getPost?.updateOne({ $inc: { likesCount: 1 } });
            res.status(200).json({ message: 'liked post', success: true });
        } else {
            await getPost?.updateOne({ $pull: { likes: userId } });
            await getPost?.updateOne({ $inc: { likesCount: -1 } });
            res.status(200).json({ message: 'disliked post', success: true });
        }
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// save and unsave post
const saveAndUnSavePost = async (req: any, res: any, next: any) => {
    const userId = req.uData.id;
    const postId = req.params.id;

    try {
        const getPost = await PostModel.findById(postId);
        if (!getPost) return next(sendError(res, 404, 'Post not found!'));

        const getUser = await UserModel.findById(userId);
        if (!getUser?.saved.includes(postId)) {
            await getUser?.updateOne({ $push: { saved: postId } });
            await getPost.updateOne({ $push: { savedCounts: userId } })
            res.status(200).json({ success: true, message: 'Postd saved successfully!' });
        } else {
            await getUser?.updateOne({ $pull: { saved: postId } });
            await getPost.updateOne({ $pull: { savedCounts: userId } })
            res.status(200).json({ success: true, message: 'Postd deleted successfully!' });
        }
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// get all posts user
const getUserPosts = async (req: any, res: any, next: any) => {
    const mainUserId = req.uData.id;
    const reqUId = req.params.id;

    try {
        const getUser = await UserModel.findById(reqUId);
        if (!getUser) return next(sendError(res, 404, 'User not found!'));

        // if (getUser.account_type !== 'private' || mainUserId === getUser._id) {
        const getPosts = await PostModel.find({ owner: reqUId }).limit(20);
        res.status(200).json({ success: true, data: getPosts, message: 'got user posts successfully' });
        // } else {
        next(sendError(res, 403, `Can't get user posts`));
        // }
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// get posts by tags
const getPostsByTags = async (req: Request, res: any, next: any) => {
    const tag = req.query.tag;
    try {
        const getTagPosts = await PostModel.find({ tags: { $in: [tag] } }).limit(30);
        res.status(200).json({ success: true, data: getTagPosts, message: `got all ${tag} posts` });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }

}

// get posts by category
const getPostsbyCategory = async (req: Request, res: any, next: any) => {
    const mainCategory = req.params.id;
    try {
        const getCatPosts = await PostModel.find({ category: mainCategory }).limit(30);
        res.status(200).json({ success: true, data: getCatPosts, message: `got all ${mainCategory} posts` });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// get all posts
const getRandomPosts = async (req: any, res: any, next: any) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const skip = page * pageLimit;

    try {
        const getRandPosts = await PostModel.aggregate([{ $skip: skip }, { $limit: pageLimit }])
        const getRandTotal = await PostModel.countDocuments()
        res.status(200).json({ success: true, data: getRandPosts, message: 'got all random posts', page: page + 1, total: getRandTotal });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// get trending posts
const getTrendingPosts = async (req: any, res: any, next: any) => {

    const page = parseInt(req.query.page) - 1 || 0;
    const skip = page * 5;


    try {
        const getTrendPosts = await PostModel.find().sort({ likesCount: -1 })
        res.status(200).json({ success: true, data: getTrendPosts, message: 'got all trending posts' });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}


// get for you posts with (selected categories )
const getUserPostsInterest = async (req: any, res: any, next: any) => {
    const userId = req.uData.id;
    const page = parseInt(req.query.page) - 1 || 0;
    const skip = page * 2;
    console.log([skip, page]);

    try {
        const allInterest: any = [];
        const user: any = await UserModel.findById(userId);
        const userInterests = user.interest;
        userInterests.map((uIn: any) => {
            allInterest.push(uIn.value)
        })

        if (userInterests?.length == 0) return next(res.status(404)
            .json({ message: `Please add at least one interest` }))
        setTimeout(async () => {
            const interestPosts = await PostModel.find({ category: allInterest }).skip(skip).limit(2)
            const totalPosts = await PostModel.find({ category: allInterest }).countDocuments();
            res.status(200).json({
                message: 'got interested posts', success: true, page: page + 1, total: totalPosts,
                data: interestPosts.flat().sort((a: any, b: any) => b.createdAt - a.createdAt)
            });
        }, 1500);
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// search posts

const searchPosts = async (req: any, res: any, next: any) => {
    const searchQuery = req.query.q;
    const page = parseInt(req.query.page) - 1 || 0;
    const skip = page * 10;
    try {
        if (searchQuery === '') return next(res.status(404)
            .json({ message: `Invalid search query` }));

        const posts = await PostModel.find({ quote: { $regex: searchQuery, $options: 'i' } }).skip(skip).limit(10);
        const postsTotal = await PostModel.find({ quote: { $regex: searchQuery, $options: 'i' } }).countDocuments();
        res.status(200).json({ data: posts, messages: 'got search posts', success: true, total: postsTotal, page: page + 1 });
    } catch (error) {

    }
}


export {
    createPost,
    deletePost,
    editPost,
    getPost,
    likeDislikePost,
    saveAndUnSavePost,
    getUserPosts,
    getPostsByTags,
    getPostsbyCategory,
    getRandomPosts,
    getTrendingPosts,
    getUserPostsInterest,
    searchPosts,
}