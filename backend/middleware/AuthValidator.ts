import { sendError } from './../utils/helper';
import { check, validationResult } from 'express-validator';

const userValidate = [
    check('email').normalizeEmail().isEmail().withMessage('Email is Invalid')
        .trim().not().isEmpty().withMessage('Email is empty'),
    check('fullname').trim().not().isEmpty().withMessage('Full name is empty').isLength({
        min: 5,
        max: 50
    }).withMessage('Full name should be at least 5 - 50 characters long'),
    check('password').trim().not().isEmpty().withMessage('Password is empty').isLength({
        min: 8,
    }).withMessage('Password should be at least 8 characters long'),
]

const validateError = (req: any, res: any, next: any) => {
    const errors = validationResult(req).array();

    if (!errors.length) return next();

    sendError(res, 401, errors[0].msg);
}

export { userValidate, validateError }