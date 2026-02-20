import "dotenv/config";
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage'); 

export const serviceAccount = '/etc/secrets/learned-484621-firebase-adminsdk-fbsvc-bb95384543.json';

export const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET
});

export const bucket = getStorage().bucket();

