const nodemailer = require('nodemailer');
const ipinfo = require('ipinfo');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // You can replace * with your frontend URL
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ message: 'CORS preflight handled' }),
    };
  }

  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*', // You can replace * with your frontend URL
      },
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { fullName, email, message, currentEmployee, submittedApplication, geoLocationUrl } = JSON.parse(event.body);
  const dateTimeSent = getFormattedDateTime();
  const clientIp = event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
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
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // You can replace * with your frontend URL
      },
      body: JSON.stringify({ success: true, redirectUrl: '/doneContact' }),
    };
  } catch (error) {
    console.error('Error sending Contact Form email:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // You can replace * with your frontend URL
      },
      body: JSON.stringify({ message: 'Error sending email', error: error.toString() }),
    };
  }
};
