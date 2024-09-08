// contact-form-backend/netlify-functions/apply-now.js

const nodemailer = require('nodemailer');
const multer = require('multer');
const ipinfo = require('ipinfo');
const { Buffer } = require('buffer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

async function getGeolocationData(ip) {
  return new Promise((resolve, reject) => {
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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const formData = JSON.parse(event.body);
  const file = formData.file;
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
  } = formData;

  const dateTimeSent = getFormattedDateTime();
  const clientIp = event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
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
            content: Buffer.from(file.buffer),
          },
        ]
      : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Application Form Email sent:', info.response);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, redirectUrl: '/doneApplication' }),
    };
  } catch (error) {
    console.error('Error sending Application Form email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.toString() }),
    };
  }
};
