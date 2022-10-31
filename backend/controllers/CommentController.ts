import CommentModel from "../models/CommentModel"
import PostModel from "../models/Post";
import { sendError } from "../utils/helper";

// add a comment
const createComment = async (req: any, res: any, next: any) => {
    const userId = req.uData.id;
    const qId = req.params.id;
    try {
        const mainPost = await PostModel.findById(qId);
        if (!mainPost) return next(sendError(res, 404, 'Post not found'));

        const newComment = new CommentModel({
            ...req.body, owner: userId, post: qId, author: mainPost.owner
        });
        await mainPost.updateOne({ $inc: { commentsCount: 1 } });
        const comment = await newComment.save();

        res.status(200).json({ message: 'added comment', success: true, data: comment });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// delete a comment
const deleteComment = async (req: any, res: any, next: any) => {
    const commentId = req.params.id;
    const userId = req.uData.id;
    try {
        const getComment = await CommentModel.findById(commentId);
        if (!getComment) return next(sendError(res, 404, 'Comment not found'));

        if (getComment?.owner === userId || getComment.author === userId) {
            await CommentModel.findOneAndDelete({ _id: commentId });
            await PostModel.findOneAndUpdate({ _id: getComment.caption }, { $inc: { commentsCount: -1 } })
            res.status(200).json({ message: 'Deleted Comment', success: true });
        } else {
            return next(sendError(res, 403, `You can only delete your comments`))
        }
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

// get all comments
const getComments = async (req: any, res: any) => {
    const postId = req.params.id
    try {
        const posts = await CommentModel.find({ post: postId }).limit(20);
        res.status(200).json({ data: posts, message: 'got all comments', success: true });
    } catch (error: any) {
        sendError(res, 500, error.message)
    }
}

export {
    getComments,
    deleteComment,
    createComment
}