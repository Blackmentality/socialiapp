import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '' 
    },
    tags: {
        type: [{}],
        default: []
    },
    owner: {
        type: String,
        required: true,
    },
    likes: {
        type: [String],
        default: []
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    savedCounts: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const PostModel = model('Post', PostSchema);

export default PostModel;