// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_POMORAF_API_KEY,
  authDomain: process.env.REACT_APP_POMORAF_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_POMORAF_PROJECT_ID,
  storageBucket: process.env.REACT_APP_POMORAF_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_POMORAF_MESSEGING_SENDER_ID,
  appId: process.env.REACT_APP_POMORAF_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);