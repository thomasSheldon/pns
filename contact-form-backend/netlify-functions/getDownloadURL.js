const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  credential: admin.credential.cert(require('../../path_to_your_service_account.json')),
  storageBucket: 'pnsupload-de885.appspot.com',
});

const storage = getStorage();
const bucket = storage.bucket();

exports.handler = async (event) => {
  const filePath = 'resumes/Contractor%20Agreement%20Mark.pdf'; // URL-encoded file path
  try {
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    if (!exists) throw new Error('File does not exist.');

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491' // or use a more reasonable expiration time
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    console.error('Error getting download URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
