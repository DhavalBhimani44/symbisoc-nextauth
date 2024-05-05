import nodemailer from 'nodemailer';
import prisma from "@/lib/db";

export const sendRegistrationMail = async ({ email, emailType, username, password, userId }: any) => {
    try {
        if (emailType === "SIGNUP") {
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
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            }
        });

        const mailOptions = {
            from: 'foxstargaming7@gmail.com',
            to: email,
            subject: 'Welcome to symbiSoc Community',
            html: `<p>Welcome to SIT's Cultural Events Community Portal</p>
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

export const sendUpcomingEventMail = async ({ emailType, organizingClub, eventName, eventDate, eventTime, eventVenue, speakerName, speakerDesignation }: any) => {
    try {
        if (emailType === "NEWEVENT") {
            const allemail = await prisma.user.findMany();
            const emailAddresses = allemail.map(user => user.email).join(', ');

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                }
            });
            const formatDate = () => {
                const date = new Date(eventDate);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                return date.toLocaleDateString('en-GB', options);
            };
            const mailOptions = {
                from: 'foxstargaming7@gmail.com',
                to: emailAddresses,
                subject: `New event posting by: ${organizingClub}`,
                html: `<h1>Hello symbiSoc community!</h1>
                        <h2>We have a new event posting by ${organizingClub} club</h2>
                        <h3>Event details are as follows: </h3>
                        <p>Event Title: ${eventName}</p>
                        <p>Organising Club: ${organizingClub} Club</p>
                        <p>Event Date: ${formatDate()}</p>
                        <p>Event Time: ${eventTime}</p>
                        <p>Event Venue: ${eventVenue}</p>
                        <h3>Speaker Details are as follows:</h3>
                        <p>Speaker Name: ${speakerName}</p>
                        <p>Speaker Designation: ${speakerDesignation}</p>`
            }

            const mailresponse = await transport.sendMail(mailOptions);
            return mailresponse;
        }
    } catch (error) {
        console.log('Error sending mail:', error);
    }
}