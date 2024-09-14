require('dotenv').config();  // Load environment variables
const nodemailer = require('nodemailer');
const multer = require('multer');
const ipinfo = require('ipinfo');

// Configure multer for handling file uploads with a file size limit (5MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('resume');

// Nodemailer configuration for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to format the current date and time
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

// Function to fetch geolocation data based on the client's IP address
async function getGeolocationData(ip) {
  return new Promise((resolve, reject) => {
    ipinfo(ip, { token: process.env.IPINFO_API_KEY }, (err, cLoc) => {
      if (err) {
        console.error('Error fetching geolocation data:', err);
        resolve({ country: 'Unknown', region: 'Unknown' });
      } else {
        resolve({ country: cLoc.country || 'Unknown', region: cLoc.region || 'Unknown' });
      }
    });
  });
}

// Lambda handler function for form submission
exports.handler = async (event) => {
  // Ensure the request is a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  return new Promise((resolve, reject) => {
    // Convert the event body to a readable stream
    const bufferStream = Buffer.from(event.body, 'base64');
    const req = {
      headers: { 'content-type': event.headers['content-type'] },
      body: bufferStream,
    };

    // Handle form data and file upload
    upload(req, {}, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return resolve({
            statusCode: 413, // Payload Too Large
            body: JSON.stringify({ message: 'File size exceeds the limit of 5MB' }),
          });
        }
        console.error('Error processing form data:', err);
        return resolve({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error processing form data' }),
        });
      }

      // Parse form data from the request
      const formData = JSON.parse(req.body.toString());

      // Validate that all required fields are present
      const requiredFields = [
        'firstName', 'lastName', 'contactNumber', 'email',
        'dob', 'location', 'registeredNurse', 'bsnDegree',
        'immigrationPetition', 'currentEmployee', 'submittedApplication', 'questions'
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          return resolve({
            statusCode: 400, // Bad Request
            body: JSON.stringify({ message: `Missing required field: ${field}` }),
          });
        }
      }

      // Get the current date and time
      const dateTimeSent = getFormattedDateTime();

      // Get the client's IP address from headers
      const clientIp = event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
      
      // Fetch geolocation data based on the client's IP address
      const { country, region } = await getGeolocationData(clientIp);

      // Construct the email body with the provided form data
      const emailText = `
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Contact Number: ${formData.contactNumber}
        Email: ${formData.email}
        Date of Birth: ${formData.dob}
        Location: ${formData.location}
        Registered Nurse: ${formData.registeredNurse}
        BSN Degree: ${formData.bsnDegree}
        Immigration Petition: ${formData.immigrationPetition}
        Current Employee: ${formData.currentEmployee}
        Submitted Application: ${formData.submittedApplication}
        Questions: ${formData.questions}
        Geolocation URL: View on Google Maps: https://www.google.com/maps?q=${country},${region}
        Date and Time Sent: ${dateTimeSent}
        Country: ${country}
        Region: ${region}
      `;

      // Email options with the resume file attachment
      const mailOptions = {
        from: formData.email,
        to: process.env.EMAIL_USER,
        subject: 'New Application Form Submission',
        text: emailText,
        attachments: req.file ? [
          {
            filename: req.file.originalname,
            content: req.file.buffer,
            contentType: req.file.mimetype,
          },
        ] : [],
      };

      // Send the email
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Application Form Email sent:', info.response);
        resolve({
          statusCode: 200,
          body: JSON.stringify({ success: true, redirectUrl: '/doneApplication' }),
        });
      } catch (error) {
        console.error('Error sending Application Form email:', error);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: 'Error sending email', error: error.toString() }),
        });
      }
    });
  });
};
