const nodemailer = require('nodemailer');

const sendMail = () => {
      var mailOptions = {
            from: 'vesselfinderteam@gmail.com',
            to: 'vesselfinderteam@gmail.com',
            subject: 'New User Alert',
            text: 'A new user has signed up for an account!'
      };

      var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                  user: 'vesselfinderteam@gmail.com',
                  pass: 'team404!'
            }
      });

      transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                  return console.log(err);
            } else {
                  console.log('Send mail successfully');
            }
      });
}

module.exports = sendMail;



