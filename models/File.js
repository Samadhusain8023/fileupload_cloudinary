const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require('dotenv').config(); // Ensure environment variables are loaded

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: { // Use lowercase for consistency
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

fileSchema.post("save", async function (doc) {
    try {
        console.log("Doc=>", doc);

        // Create a transporter
        // let transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     port: 465, // Use 587 for TLS, 465 for SSL
        //     secure: true, // true for SSL, false for TLS
        //     auth: {
        //         user: process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS,
        //     },
        // });

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465, // Use 587 for TLS, or 465 for SSL
            secure: true, // true for 465, false for 587
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Ignore self-signed certificate errors
            },
        });
        


        // Send email notification
        let info = await transporter.sendMail({
            from:`CodeHelp - by samad`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2> 
                   <p>File uploaded view here: 
                   <a href="${doc.url}">${doc.url}</a></p>` // Fixed href issue
        });

        console.log("INFO=>", info);
        console.log("mail send ho gya hai");

    } catch (err) {
        console.error("Email sending failed:", err);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
