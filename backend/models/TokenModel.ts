import { Schema, Types, model } from 'mongoose';

const tokenSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { expires: 3600 });

const TokenModel = model('token', tokenSchema);

export default TokenModel;
