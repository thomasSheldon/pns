require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const ipinfo = require('ipinfo');

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper function to get the current date and time in a readable format
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

// Helper function to get geolocation information
async function getGeolocationData(ip) {
  return new Promise((resolve, reject) => {
    // Ensure IP info is fetched using the API key
    ipinfo(ip, { token: process.env.IPINFO_API_KEY }, (err, cLoc) => {
      if (err) {
        console.error('Error fetching geolocation data:', err);
        resolve({ country: 'Unknown', region: 'Unknown' });
      } else {
        const country = cLoc.country || 'Unknown';
        const region = cLoc.region || 'Unknown';
        resolve({ country, region });
      }
    });
  });
}

// Contact Form Endpoint
app.post('/send-email', async (req, res) => {
  const { fullName, email, message, currentEmployee, submittedApplication, geoLocationUrl } = req.body;
  const dateTimeSent = getFormattedDateTime();

  // Fetch IP address of the client
  const clientIp = req.headers['x-forwarded-for'] || req.remoteAddress;

  // Fetch geolocation data
  const { country, region } = await getGeolocationData(clientIp);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `
      Name: ${fullName}
      Email: ${email}
      Message: ${message}
      Current Employee: ${currentEmployee}
      Submitted Application: ${submittedApplication}
      Location: ${geoLocationUrl ? `View on Google Maps: ${geoLocationUrl}` : 'Not Provided'}
      Date and Time Sent: ${dateTimeSent}
      Country: ${country}
      Region: ${region}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact Form Email sent:', info.response);
    res.status(200).json({ success: true, redirectUrl: '/doneContact' });
  } catch (error) {
    console.error('Error sending Contact Form email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.toString() });
  }
});

// Application Form Endpoint
app.post('/apply-now', upload.single('file'), async (req, res) => {
  const {
    firstName,
    lastName,
    contactNumber,
    email,
    dob,
    location,
    registeredNurse,
    bsnDegree,
    immigrationPetition,
    currentEmployee,
    submittedApplication,
    questions,
    geoLocationUrl,
  } = req.body;

  const file = req.file;
  const dateTimeSent = getFormattedDateTime();

  // Fetch IP address of the client
  const clientIp = req.headers['x-forwarded-for'] || req.remoteAddress;

  // Fetch geolocation data
  const { country, region } = await getGeolocationData(clientIp);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Application Form Submission',
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Contact Number: ${contactNumber}
      Email: ${email}
      Date of Birth: ${dob}
      Location: ${location}
      Registered Nurse: ${registeredNurse}
      BSN Degree: ${bsnDegree}
      Immigration Petition: ${immigrationPetition}
      Current Employee: ${currentEmployee}
      Submitted Application: ${submittedApplication}
      Questions: ${questions}
      Location: ${geoLocationUrl ? `View on Google Maps: ${geoLocationUrl}` : 'Not Provided'}
      Date and Time Sent: ${dateTimeSent}
      Country: ${country}
      Region: ${region}
    `,
    attachments: file
      ? [
          {
            filename: file.originalname,
            content: file.buffer,
          },
        ]
      : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Application Form Email sent:', info.response);
    res.status(200).json({ success: true, redirectUrl: '/doneApplication' });
  } catch (error) {
    console.error('Error sending Application Form email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.toString() });
  }
});

// Newsletter Subscription Endpoint
app.post('/subscribe', async (req, res) => {
  const { email, geoLocationUrl } = req.body;
  const dateTimeSent = getFormattedDateTime();

  // Fetch IP address of the client
  const clientIp = req.headers['x-forwarded-for'] || req.remoteAddress;

  // Fetch geolocation data
  const { country, region } = await getGeolocationData(clientIp);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Newsletter Subscription',
    text: `
      A new user has subscribed to the newsletter:
      
      Email: ${email}
      Location: ${geoLocationUrl ? `View on Google Maps: ${geoLocationUrl}` : 'Not Provided'}
      Date and Time Sent: ${dateTimeSent}
      Country: ${country}
      Region: ${region}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Subscription Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error sending subscription email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.toString() });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
