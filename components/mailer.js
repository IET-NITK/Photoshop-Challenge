var nodemailer = require('nodemailer');
var configs = require("../config");

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
	secure: false,
	auth: {
        user: configs.email.username,
        pass: configs.email.password
    }
});

var mailOptions = (username, password) =>{
    return {
        from: configs.email.username,
        to: username,
        subject: 'IET Registration',
        html:`
        <div style="width:100%;max-width:800px;position:absolute;">
            <div style="margin:auto;position:relative;">
                <h5>Hello ${username}</5>
                <p>
                    Greetings from IET NITK. You are successfully registered for Photoshop competition.
                    Your password is
                </p>
                <h1>${password}</h1>

                <p> For further queries contact : dev.ietnitk@gmail.com </p>
            </div>
        </div>           
        `
    }
};

exports.opts = mailOptions
exports.service = transporter