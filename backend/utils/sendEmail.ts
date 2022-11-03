import nodemailer from "nodemailer";
const sendEmail = async (subject: string, message: string, email: string) => {
    try {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            },
        });
        let info = await transporter.sendMail({
            from: '"Sociali 👻" <hello@sociali.com>',
            to: `${email}`,
            subject: `${subject}`,
            text: `${message}`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail