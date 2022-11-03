import { sendError } from './../utils/helper';
import { Request, Response } from 'express';
import UserModel from '../models/User';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';
import TokenModel from '../models/TokenModel';

const signJWT = (res: any, userInfo: any, msg: string) => {
    const token = sign({ id: userInfo._id }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });
    delete userInfo['password'];
    res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: "none" }).status(200).json({ success: true, data: userInfo, message: msg });
}

const registerUser = async (req: Request, res: Response) => {
    try {
        const registerData = req.body;
        const newPassword = await hashSync(registerData.password, 10);
        const username = registerData.email.split('@')[0];
        const checkIfUserExists = await UserModel.findOne({ email: registerData.email });

        if (checkIfUserExists) return sendError(res, 406, 'User already exist!');
        const newUser = new UserModel({ ...registerData, password: `${newPassword}`, username });
        await newUser.save();

        const getUser: any = await UserModel.findOne({ email: registerData.email }).lean();
        const userGenToken = new TokenModel({
            userId: newUser._id,
            token: crypto.randomBytes(32).toString('hex')
        })
        userGenToken.save();

        // await sendEmail('Congratulations for joining Sociali', 'Welcome to Sociali platform!', registerData.email);

        const token = sign({ id: newUser._id }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });
        delete getUser['password'];
        res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: "none" }).status(200).json({
            success: true,
            message: 'Account Created! Email verification link sent to your account. Click to verify your email. ',
            data: getUser
        });
        // signJWT(res, newUser, 'User signed in');
    } catch (error: any) {
        return sendError(res, 500, 'Internal Server Error');
    }

}

const signInUser = async (req: Request, res: Response) => {
    try {
        const signInCred = req.body;

        const getUser: any = await UserModel.findOne({ email: signInCred.email }).lean();

        if (!getUser) return sendError(res, 401, 'User credentials invalid!')

        const checkPass = await compareSync(signInCred.password, getUser.password);
        if (!checkPass) return sendError(res, 401, 'Password is incorrect');
        delete getUser.password;
        signJWT(res, getUser, 'User signed in');
    } catch (error: any) {
        return sendError(res, 500, 'Internal Server Error');
    }
}

const logoutUser = async (req: Request, res: Response) => {
    res.cookie('access_token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ message: 'logged out successfully', success: true });
}

const forgotPassword = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const isUser = await UserModel.findOne({ email: email });

        if (!isUser) return sendError(res, 404, "User not found");

        const userGenToken = new TokenModel({
            userId: isUser._id,
            token: crypto.randomBytes(32).toString('hex')
        });
        userGenToken.save();

        const url: string = `${process.env.BASE_URL}/auth/${isUser._id}/password-reset/${userGenToken.token}`;
        sendEmail('Forgot Password', `Please reset your account password\n url`, isUser.email);
        res.status(200).json({ message: 'Password reset email sent', success: true });

    } catch (error: any) {
        return sendError(res, 500, error.message);
    }
}

const verifyAndChangePassword = async (req: Request, res: Response) => {
    const userId = req.body.id;
    const token = req.body.token;
    const newPassword = req.body.password;

    try {
        const user = await UserModel.findOne({ _id: userId });
        if (!user) return sendError(res, 401, 'Unauthorized user!')

        const isTokenValid = await TokenModel.findOne({
            userId: userId,
            token: token
        });

        if (!isTokenValid) return sendError(res, 401, 'Unauthorized user!');
        const genPassword = await hashSync(newPassword, 10);
        await UserModel.findOne({ _id: userId, password: genPassword });
        await isTokenValid.remove()
        res.status(200).json({ success: true, message: 'Password reset successful!' });
    } catch (error) {
        return sendError(res, 500, 'Internal Server Error');
    }

}

export {
    registerUser,
    signInUser,
    logoutUser,
    forgotPassword,
    verifyAndChangePassword
}