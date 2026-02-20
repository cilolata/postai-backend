import "dotenv/config";
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") as String

export const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    "project_id": privateKey,
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const bucket = getStorage().bucket();
