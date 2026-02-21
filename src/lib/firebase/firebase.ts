const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage'); 


export const app = initializeApp({
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
});

export const bucket = getStorage().bucket();

