import nodemailer from 'nodemailer';
import prisma from "@/lib/db";

export const sendRegistrationMail = async({email, emailType, username, password, userId} : any) => {
    try {        

        if(emailType === "SIGNUP") {
            await prisma.user.findUnique({
                where: {
                    id: userId
                },
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f8253bc7b5e15f",
                pass: "78d4abdf42a779"
            }
        });

        const mailOptions = {
            from : '99269dhruvpatel@gmail.com',
            to: email,
            subject: 'Welcome to symbiSoc Community',
            html : `<p>Welcome to SIT's Cultural Events Community Portal</p>
                    <p>We are glad to have you onboard</p>
                    <p>Sign Up successfull!</p>
                    <p>Credentials for symbiSoc portal:</p>
                    <p>Username: ${username}</p>
                    <p>Email : ${email}</p>                    
                    <p>Password : ${password}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error) {
        console.log('Error sending mail:', error);
    }
}