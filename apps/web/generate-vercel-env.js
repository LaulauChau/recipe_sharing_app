const fs = require("node:fs");

console.log("project id", process.env.FIREBASE_PROJECT_ID);
console.log("app id", process.env.FIREBASE_APP_ID);
console.log("storage bucket", process.env.FIREBASE_STORAGE_BUCKET);
console.log("api key", process.env.FIREBASE_API_KEY);
console.log("auth domain", process.env.FIREBASE_AUTH_DOMAIN);
console.log("messaging sender id", process.env.FIREBASE_MESSAGING_SENDER_ID);

const envContent = `export const environment = {
  firebase: {
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}'
  }
};`;

fs.writeFileSync("src/config/environment.ts", envContent);
