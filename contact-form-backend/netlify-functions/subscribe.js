// contact-form-backend/netlify-functions/subscribe.js
// require('dotenv').config();  // Load environment variables
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
console.log('Email user:', process.env.EMAIL_USER);
console.log('Email pass:', process.env.EMAIL_PASS ? '******' : 'Not Set');

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

  const { email, geoLocationUrl } = JSON.parse(event.body);
  const dateTimeSent = getFormattedDateTime();
  const clientIp = event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
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
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Subscription successful!' }),
    };
  } catch (error) {
    console.error('Error sending subscription email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.toString() }),
    };
  }
};
