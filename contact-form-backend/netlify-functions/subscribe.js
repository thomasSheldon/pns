require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const ipinfo = require('ipinfo');

// Set up SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send email using SendGrid
async function sendEmail(mailOptions) {
  try {
    const result = await sgMail.send(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body : error.message);
    throw new Error('Error sending email: ' + error.message);
  }
}

// Function to get formatted date and time
function getFormattedDateTime() {
  const now = new Date();
  return now.toLocaleString(); // Formats date and time according to local settings
}

// Function to fetch geolocation data
async function getGeolocationData(ip) {
  return new Promise((resolve) => {
    ipinfo(ip, { token: process.env.IPINFO_API_KEY }, (err, cLoc) => {
      if (err) {
        console.error('Error fetching geolocation data:', err);
        resolve({ country: 'Unknown', region: 'Unknown' });
      } else {
        console.log('Geolocation Data:', cLoc); // Log the full geolocation data
        const country = cLoc.country || 'Unknown';
        const region = cLoc.region || 'Unknown';
        resolve({ country, region });
      }
    });
  });
}


// Main handler function
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { email, geoLocationUrl } = JSON.parse(event.body);
    const dateTimeSent = getFormattedDateTime();
    const clientIp = event.headers['x-forwarded-for'] || event.requestContext.identity.sourceIp;
    const { country, region } = await getGeolocationData(clientIp);

    // Prepare mail options for SendGrid
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL,   // Use verified sender email
      to: process.env.SENDGRID_TO_EMAIL,        // Receiver's email
      subject: 'New Newsletter Subscription',
      text: `A new user has subscribed to the newsletter:\n\nEmail: ${email}\nLocation: ${geoLocationUrl ? `View on Google Maps: ${geoLocationUrl}` : 'Not Provided'}\nDate and Time Sent: ${dateTimeSent}\nCountry: ${country}\nRegion: ${region}`,
    };

    console.log('Mail Options:', mailOptions); // Log mail options to see what is being sent

    const info = await sendEmail(mailOptions);
    console.log('Subscription Email sent:', info);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Subscription successful!' }),
    };
  } catch (error) {
    console.error('Error sending subscription email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message }),
    };
  }
};
