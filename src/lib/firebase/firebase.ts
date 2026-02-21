import "dotenv/config";
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage'); 

export const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS) : null;

export const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET
});

export const bucket = getStorage().bucket();

