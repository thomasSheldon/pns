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

// Function to sanitize file name
function sanitizeFileName(fileName) {
  const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
  const extension = fileName.split('.').pop();
  return `${nameWithoutExtension.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;
}

// Function to upload resume to Firebase Storage
async function uploadResumeToFirebase(fileBuffer, fileName) {
  try {
    const sanitizedFileName = sanitizeFileName(fileName);
    const file = bucket.file(`resumes/${sanitizedFileName}`);

    // Log before saving
    console.log(`Saving file ${sanitizedFileName} to Firebase`);

    // Save the file to Firebase Storage with the correct MIME type
    await file.save(fileBuffer, {
      metadata: { contentType: 'application/pdf' },
    });

    // Make the file public
    await file.makePublic();

    // Get the public URL
    const [metadata] = await file.getMetadata();
    const downloadToken = metadata?.metadata?.firebaseStorageDownloadTokens;
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(`resumes/${sanitizedFileName}`)}?alt=media&token=${downloadToken}`;
    
    console.log(`File uploaded successfully. Metadata:`, metadata);
    console.log(`File accessible at: ${downloadURL}`);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    throw new Error('File upload failed');
  }
}


// Function to extract file data from multipart form data
function extractFileData(parts, boundary) {
  let resumeBuffer = null;
  let fileName = null;

  parts.forEach((part) => {
    const [header, content] = part.split('\r\n\r\n');
    if (header && content) {
      const fileNameMatch = header.match(/filename="(.+?)"/);
      if (fileNameMatch) {
        fileName = fileNameMatch[1];
        const contentTypeMatch = header.match(/Content-Type: (.+)/);
        if (contentTypeMatch && contentTypeMatch[1] === 'application/pdf') {
          // Clean content from boundary markers and extra newlines
          const cleanedContent = content.split(`--${boundary}`)[0].trim();
          resumeBuffer = Buffer.from(cleanedContent, 'binary');
        }
      }
    }
  });

  return { resumeBuffer, fileName };
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

    if (!contentType || !contentType.includes('boundary=')) {
      throw new Error('Content-Type header missing or invalid');
    }

    const bodyBuffer = Buffer.from(event.body, 'base64');
    const boundary = contentType.split('boundary=')[1];
    const parts = bodyBuffer.toString('binary').split(`--${boundary}`);

    const fieldValues = {};
    let resumeBuffer = null;
    let fileName = null;

    // Extract file data with boundary
    const { resumeBuffer: extractedBuffer, fileName: extractedFileName } = extractFileData(parts, boundary);
    resumeBuffer = extractedBuffer;
    fileName = extractedFileName;

    if (resumeBuffer && fileName) {
      const resumeUrl = await uploadResumeToFirebase(resumeBuffer, fileName);
      fieldValues.resumeUrl = resumeUrl;
    }

    // Extract form fields
    parts.forEach((part) => {
      const [header, content] = part.split('\r\n\r\n');
      if (header && content) {
        const nameMatch = header.match(/name="(.+?)"/);
        if (nameMatch) {
          const fieldName = nameMatch[1];
          if (!fileName || !header.match(/filename="(.+?)"/)) {
            fieldValues[fieldName] = content.trim();
          }
        }
      }
    });

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
