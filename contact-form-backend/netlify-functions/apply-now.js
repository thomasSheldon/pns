const nodemailer = require('nodemailer');
const { Buffer } = require('buffer');
const { bucket } = require('./firebaseConfig');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to get formatted date and time
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

// Function to upload resume to Firebase Storage
async function uploadResumeToFirebase(fileBuffer, fileName) {
  try {
    const file = bucket.file(`resumes/${fileName}`);
    
    // Save the file to Firebase Storage
    await file.save(fileBuffer);

    // Make the file public
    await file.makePublic();

    // Get the public URL of the file
    const downloadURL = `https://storage.googleapis.com/${bucket.name}/resumes/${fileName}`;
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    throw new Error('File upload failed');
  }
}


// Main handler function for Netlify
const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];

    // Decode the base64-encoded body (since Netlify passes form data as base64)
    const bodyBuffer = Buffer.from(event.body, 'base64');

    // Parse form data (assumes multipart/form-data)
    const boundary = contentType.split('boundary=')[1];
    const parts = bodyBuffer.toString().split(`--${boundary}`);

    // Extract fields and files from the parsed form data
    const fieldValues = {};
    let resumeBuffer = null;
    let fileName = null;

    parts.forEach((part) => {
      const [header, content] = part.split('\r\n\r\n');
      if (header && content) {
        const nameMatch = header.match(/name="(.+?)"/);
        const fileNameMatch = header.match(/filename="(.+?)"/);
        if (nameMatch && !fileNameMatch) {
          // This is a form field
          const fieldName = nameMatch[1];
          fieldValues[fieldName] = content.trim();
        } else if (fileNameMatch) {
          // This is a file
          fileName = fileNameMatch[1];
          resumeBuffer = Buffer.from(content, 'binary');
        }
      }
    });

    // If a resume was uploaded, save it to Firebase
    if (resumeBuffer && fileName) {
      const resumeUrl = await uploadResumeToFirebase(resumeBuffer, fileName);
      fieldValues.resumeUrl = resumeUrl;
    }

    // Prepare the email body
    const emailText = `
      First Name: ${fieldValues.firstName}
      Last Name: ${fieldValues.lastName}
      Contact Number: ${fieldValues.contactNumber}
      Email: ${fieldValues.email}
      Date of Birth: ${fieldValues.dob}
      Location: ${fieldValues.location}
      Registered Nurse: ${fieldValues.registeredNurse}
      BSN Degree: ${fieldValues.bsnDegree}
      Immigration Petition: ${fieldValues.immigrationPetition}
      Current Employee: ${fieldValues.currentEmployee}
      Submitted Application: ${fieldValues.submittedApplication}
      Questions: ${fieldValues.questions}
      Resume URL: ${fieldValues.resumeUrl}
      Date and Time Sent: ${getFormattedDateTime()}
    `;

    // Send email
    const mailOptions = {
      from: fieldValues.email,
      to: process.env.EMAIL_USER,
      subject: 'New Application Form Submission',
      text: emailText,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, redirectUrl: '/doneApplication' }),
    };
  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing form', error: error.toString() }),
    };
  }
};

module.exports = { handler };
