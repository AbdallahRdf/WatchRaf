// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.POMORAF_API_KEY,
  authDomain: process.env.POMORAF_AUTH_DOMAIN,
  projectId: process.env.POMORAF_PROJECT_ID,
  storageBucket: process.env.POMORAF_STORAGE_BUCKET,
  messagingSenderId: process.env.POMORAF_MESSEGING_SENDER_ID,
  appId: process.env.POMORAF_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);