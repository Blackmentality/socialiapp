import { sendError } from './../utils/helper';
import UserModel from "../models/User";
import { Request, Response } from 'express';

const pageLimit = 20;
// Get User by Id
const getUserById = async (req: Request, res: Response, next: any) => {
    const userId = req.params.id

    try {
        const getUser = await UserModel.findById(userId);
        if (!getUser) return next(sendError(res, 404, 'User not Found'));

        res.status(200).json({ data: getUser, message: 'got user', success: true });

    } catch (error: any) {
        next(sendError(res, 404, error.message));
    }
}

// Edit User Profile
const editUserProfile = async (req: any, res: Response, next: any) => {
    const userId = req.uData.id;
    const editId = req.params.id;

    if (userId === editId) {
        try {
            const newData = await UserModel.findOneAndUpdate({ _id: userId },
                { $set: { ...req.body } }, {
                new: true
            });
            res.status(200).json({ message: 'Updated user', data: newData, success: true });
        } catch (error: any) {
            next(sendError(res, 404, error.message));
        }

    } else {
        return next(sendError(res, 403, `You're can't edit someone's profile`));
    }


}

// Change Banner / Profile Img
const changeProfileImg = async (req: any, res: Response, next: any) => {

    const userId = req.uData.id;
    const editId = req.params.id;
    const uploadType = req.params.type;
    try {
        if (req.file.size > 1000000) return next(sendError(res, 404, 'Image must be at least 1MB'));

        const encoded = req.file?.buffer.toString('base64');
        const encode_img = `data:image/jpeg;base64,${encoded}`;
        if (userId !== editId) return next(sendError(res, 404, `Can't edit someones's profile!`))
        const isUserExists = await UserModel.findById(userId);
        if (!isUserExists) return next(sendError(res, 404, 'User not Found'));

        if (uploadType === 'profile_img') {
            const newData = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { profile_img: encode_img } }, { new: true });
            res.status(200).json({
                data: newData,
                message: "profile updated",
                success: true
            });
        } else if (uploadType === 'banner') {
            const newData = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { banner: encode_img } }, { new: true });
            res.status(200).json({
                data: newData,
                message: "banner updated",
                success: true
            });
        }

    } catch (error: any) {
        return next(sendError(res, 404, error.message));
    }


}

// search accounts
const searchAccounts = async (req: Request, res: any, next: any) => {
    const searchQuery = req.query.q;
    try {
        if (searchQuery === '') return next(res.status(404)
            .json({ message: `Invalid search query` }));

        const users = await UserModel.find({
            $or: [
                { username: { $regex: searchQuery, $options: 'i' } }, { fullname: { $regex: searchQuery, $options: 'i' } }
            ]
        }).limit(40);
        res.status(200).json({ data: users, messages: 'got search users', success: true });
    } catch (error) {

    }
}

// get all accounts
const getRandomAccounts = async (req: any, res: any, next: any) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const skip = page * pageLimit;

    try {
        const getRandUsers = await UserModel.aggregate([{ $skip: skip }, { $limit: pageLimit }])
        const getRandTotal = await UserModel.countDocuments()
        res.status(200).json({ success: true, data: getRandUsers, message: 'got all random users', page: page + 1, total: getRandTotal });
    } catch (error: any) {
        next(sendError(res, 500, error.message));
    }
}

export {
    getUserById,
    editUserProfile,
    changeProfileImg,
    searchAccounts,
    getRandomAccounts,
}