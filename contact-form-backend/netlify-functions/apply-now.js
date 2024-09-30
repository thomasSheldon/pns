const sgMail = require('@sendgrid/mail');
const { storage, bucket } = require('./firebaseConfig'); // Import Firebase storage and bucket

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set the SendGrid API key

// Function to get the current formatted date and time
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

// Function to sanitize the file name by replacing illegal characters
function sanitizeFileName(fileName) {
  const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
  const extension = fileName.split('.').pop();
  return `${nameWithoutExtension.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;
}

// Function to upload the resume file to Firebase Storage
// Function to upload the resume file to Firebase Storage
async function uploadResumeToFirebase(fileBuffer, fileName) {
  try {
    const sanitizedFileName = sanitizeFileName(fileName);
    const file = bucket.file(`resumes/${sanitizedFileName}`);

    console.log(`Saving file ${sanitizedFileName} to Firebase Storage`);

    await file.save(fileBuffer, {
      metadata: { contentType: 'application/pdf' },
    });

    await file.makePublic();
    const downloadURL = `https://storage.googleapis.com/${bucket.name}/resumes/${sanitizedFileName}`;

    console.log(`File uploaded successfully: ${downloadURL}`);

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
          const cleanedContent = content.split(`--${boundary}`)[0].trim();
          resumeBuffer = Buffer.from(cleanedContent, 'binary');
        }
      }
    }
  });

  return { resumeBuffer, fileName };
}

// Main handler function for the Netlify function
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  let fileName = null;
  let resumeBuffer = null;

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];

    if (!contentType || !contentType.includes('boundary=')) {
      throw new Error('Content-Type header missing or invalid');
    }

    const bodyBuffer = Buffer.from(event.body, 'base64');
    const boundary = contentType.split('boundary=')[1];
    const parts = bodyBuffer.toString('binary').split(`--${boundary}`);

    const fieldValues = {};

    // Extract the file from the form data
    const { resumeBuffer: extractedBuffer, fileName: extractedFileName } = extractFileData(parts, boundary);
    resumeBuffer = extractedBuffer;
    fileName = extractedFileName;

    // If the resume exists, upload it to Firebase and retrieve the URL
    if (resumeBuffer && fileName) {
      const resumeUrl = await uploadResumeToFirebase(resumeBuffer, fileName);
      fieldValues.resumeUrl = resumeUrl; // Set the URL for use in the email
    }

    // Extract form fields (text input values)
    parts.forEach((part) => {
      const [header, content] = part.split('\r\n\r\n');
      if (header && content) {
        const nameMatch = header.match(/name="(.+?)"/);
        if (nameMatch) {
          const fieldName = nameMatch[1];
          if (!header.match(/filename="(.+?)"/)) {
            fieldValues[fieldName] = content.trim();
          }
        }
      }
    });

    // Prepare the email body
    const emailHtml = `
      <h2>New Application Form Submission</h2>
      <p><strong>First Name:</strong> ${fieldValues.firstName}</p>
      <p><strong>Last Name:</strong> ${fieldValues.lastName}</p>
      <p><strong>Contact Number:</strong> ${fieldValues.contactNumber}</p>
      <p><strong>Email:</strong> ${fieldValues.email}</p>
      <p><strong>Date of Birth:</strong> ${fieldValues.dob}</p>
      <p><strong>Location:</strong> ${fieldValues.location}</p>
      <p><strong>Registered Nurse:</strong> ${fieldValues.registeredNurse}</p>
      <p><strong>BSN Degree:</strong> ${fieldValues.bsnDegree}</p>
      <p><strong>Immigration Petition:</strong> ${fieldValues.immigrationPetition}</p>
      <p><strong>Current Employee:</strong> ${fieldValues.currentEmployee}</p>
      <p><strong>Submitted Application:</strong> ${fieldValues.submittedApplication}</p>
      <p><strong>Questions:</strong> ${fieldValues.questions}</p>
      <p><strong>Resume URL:</strong> <a href="${fieldValues.resumeUrl}">Download Resume</a></p>
      <p><strong>Date and Time Sent:</strong> ${getFormattedDateTime()}</p>
    `;

    // Email sending configuration
    const msg = {
      to: process.env.SENDGRID_FROM_EMAIL, // Set recipient email
      from: process.env.SENDGRID_FROM_EMAIL, // Sender email
      subject: 'New Application Form Submission',
      html: emailHtml, // Use preformatted text for email body
      mail_settings: {
        sandbox_mode: {
          enable: false // Ensure this is set to false
        }
      }
    };

    console.log('Sending email to:', process.env.SENDGRID_FROM_EMAIL);

    // Send the email using SendGrid
    await sgMail.send(msg);

    // Return success response and redirect URL
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, redirectUrl: '/doneApplication' }),
    };
  } catch (error) {
    const fileUrl = fileName ? `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/resumes%2F${encodeURIComponent(fileName)}?alt=media` : 'unknown';

    console.error(`Error processing form. Check the uploaded file link: ${fileUrl}`);
    console.error('Error details:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing form', error: error.toString() }),
    };
  }
};
