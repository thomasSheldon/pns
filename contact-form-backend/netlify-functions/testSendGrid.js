const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.SENDGRID_TO_EMAIL, // Email will be sent to pacificnursingsolutions@gmail.com
  from: process.env.SENDGRID_FROM_EMAIL, // Email is sent from markjohnsaspa@gmail.com (verified)
  subject: 'Application Data Submission',
  text: 'Your application data has been received.',
  html: '<strong>Your application data has been received.</strong>',
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully');
  })
  .catch((error) => {
    console.error('Error sending email:', error.response.body);
  });
