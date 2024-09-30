// Load environment variables from .env file
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

async function sendTestEmail() {
  // Create a new OAuth2 client
  const OAuth2 = google.auth.OAuth2;
  const oAuth2Client = new OAuth2(
    process.env.CLIENT_ID, // Client ID from your Google Cloud project
    process.env.CLIENT_SECRET, // Client Secret from your Google Cloud project
    'https://developers.google.com/oauthplayground' // Ensure this matches your redirect URI
  );

  // Set the refresh token for the OAuth2 client
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN, // Refresh token from the OAuth process
  });

  try {
    // Get access token from the OAuth2 client
    const accessToken = await oAuth2Client.getAccessToken();

    // Create the Nodemailer transporter using OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Service to use (Gmail)
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER, // Your Gmail address (the sender)
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token, // Use the newly obtained access token
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to: process.env.EMAIL_USER, // Recipient's email (can be changed)
      subject: 'Test Email', // Subject of the email
      text: 'This is a test email.', // Body of the email
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response); // Log the result
  } catch (error) {
    console.error('Error sending email:', error); // Log any error that occurs
  }
}

// Call the function to send the test email
sendTestEmail();
