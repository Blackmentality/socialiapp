import express from "express";
import nodemailer from "nodemailer";
import path from "path";
const hbs = require('nodemailer-express-handlebars');
const viewPath = path.resolve(__dirname, '../src/templates/views/');

let res = Response;
const sendEmail = async (type: string, email: string, subject: string, fullname: string,
    legal: string, link: string, date: string, message: string, department: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASS,
            },
        });
        transporter.use('compile', hbs({
            viewEngine: {
                extName: '.handlebars',
                layoutsDir: viewPath,
                defaultLayout: false,
                express
            },
            viewPath: viewPath,
            extName: '.handlebars',
        }));

        let mailOptions: any = {
            from: `"Kuuote" <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject: subject,
            template: '',
            context: {
                name: fullname,
                legal,
                link,
                date,
                message,
                department
            }
        };
        if (type === 'welcome') {
            mailOptions['template'] = 'welcome';
        } else if (type === 'forgot') {
            mailOptions['template'] = 'forgot'
        } else if (type === 'message') {
            mailOptions['template'] = 'message'
        } else if (type === 'verify') {
            mailOptions['template'] = 'verify'
        } else if (type === 'legal') {
            mailOptions['template'] = 'legal'
        }

        setTimeout(() => {
            transporter.sendMail(mailOptions, function (error: any, info: any) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('sent successfully\nEmail sent: ' + info.response);
                }
            });
        }, 500);
    } catch (error: any) {
        console.log(error.message);
    }
};

export default sendEmail