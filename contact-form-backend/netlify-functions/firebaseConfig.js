// netlify/functions/firebaseConfig.js
// const admin = require('firebase-admin');
// const { getStorage } = require('firebase-admin/storage');
// const path = require('path');

// // Ensure Firebase Admin SDK is initialized only once
// if (!admin.apps.length) {
//   try {
//     // Load the service account key JSON directly
//     const serviceAccount = require(path.join(__dirname, './serviceAccountKey.json')); // Ensure this path is correct
    
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//       storageBucket: "grid-mail.appspot.com" // Your Firebase Storage bucket name
//     });

//     console.log("Firebase Admin SDK successfully initialized.");
//   } catch (error) {
//     console.error("Error initializing Firebase Admin SDK: ", error);
//     throw new Error("Failed to initialize Firebase with the provided service account key.");
//   }
// } else {
//   console.log("Firebase Admin SDK is already initialized.");
// }

// // Get reference to Firebase Storage
// const storage = getStorage();
// const bucket = storage.bucket(); // Reference to the storage bucket

// module.exports = { storage, bucket };


//testing
// netlify/functions/firebaseConfig.js
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

// Ensure Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
  const base64EncodedKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;

  if (!base64EncodedKey) {
    console.error("Environment variable GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 is not set.");
    throw new Error("Service account key is missing. Please set the GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 environment variable.");
  }

  try {
    // Decode Base64-encoded key
    const serviceAccountJson = Buffer.from(base64EncodedKey, 'base64').toString('ascii');
    console.log("Decoded Firebase Service Account Key."); // For security, avoid logging the full key.

    // Parse JSON and initialize Firebase Admin SDK
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "pnsupload-de885.appspot.com" // Your Firebase Storage bucket name
    });
    console.log("Firebase Admin SDK successfully initialized.");
  } catch (error) {
    console.error("Error decoding or parsing the service account key: ", error);
    throw new Error("Failed to decode or initialize Firebase with the provided service account key.");
  }
} else {
  console.log("Firebase Admin SDK is already initialized.");
}

// Get reference to Firebase Storage
const storage = getStorage();
const bucket = storage.bucket(); // Reference to the storage bucket

module.exports = { storage, bucket };


// // netlify/functions/firebaseConfig.js
// const admin = require('firebase-admin');
// const { getStorage } = require('firebase-admin/storage');
// const fs = require('fs');

// // Ensure Firebase Admin SDK is initialized only once
// if (!admin.apps.length) {
//   // Decode the Base64-encoded service account key from environment variable
//   const base64EncodedKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64;
//   const serviceAccountJson = Buffer.from(base64EncodedKey, 'base64').toString('ascii');
  
//   // Initialize Firebase Admin SDK with the decoded service account
//   admin.initializeApp({
//     credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
//     storageBucket: "pnsupload-de885.appspot.com" // Your Firebase Storage bucket name
//   });
// }

// // Get reference to the Firebase Storage
// const storage = getStorage();
// const bucket = storage.bucket(); // Reference the storage bucket

// module.exports = { storage, bucket };


// // netlify/functions/firebaseConfig.js
// const { initializeApp, applicationDefault } = require('firebase-admin/app');
// const { getStorage } = require('firebase-admin/storage');
// const admin = require('firebase-admin');

// const bucket = storage.bucket(); // Get reference to your storage bucket

// // Initialize Firebase Admin SDK
// const serviceAccount = require('../serviceAccountKey.json'); // Adjust path as needed

// initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   apiKey: "AIzaSyByuHvWHxGhN_AjvuWo7bsEyzenY4s8p1c",
//   authDomain: "pnsupload-de885.firebaseapp.com",
//   projectId: "pnsupload-de885",
//   storageBucket: "pnsupload-de885.appspot.com",
//   messagingSenderId: "978696153360",
//   appId: "1:978696153360:web:2911f740152bdde0431d95"
// });

// const storage = getStorage();

// module.exports = { storage };
