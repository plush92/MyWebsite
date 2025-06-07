const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});

app.post('/send-email', (req, res) => {
    const { email, phone, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: 'New Form Submission',
        text: `Email: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(3001, () => console.log('Server running on port 3001'));
