import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    post: {
        ref: 'Post',
        type: String,
        required: true
    },
    author: {
        req: 'user',
        type: String,
        required: true
    }

}, { timestamps: true })

const CommentModel = model('comment', CommentSchema);

export default CommentModel;