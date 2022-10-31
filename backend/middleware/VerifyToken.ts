import { sendError } from './../utils/helper';
import { verify } from 'jsonwebtoken';

const verifyToken = (req: any, res: any, next: any) => {
    const uToken = req.cookies.access_token;
    if (!uToken) return next(sendError(res, 401, `You're unauthorized`));
    verify(`${uToken}`, `${process.env.JWT_SECRET}`, (err: any, userdata: any) => {
        if (err) return next(sendError(res, 403, 'Token is invalid'));
        req.uData = userdata;
        next();
    });
}

export default verifyToken;