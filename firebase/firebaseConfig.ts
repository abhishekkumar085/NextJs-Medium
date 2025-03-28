// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'medium-blog-d0fc3.firebaseapp.com',
  projectId: 'medium-blog-d0fc3',
  storageBucket: 'medium-blog-d0fc3.firebasestorage.app',
  messagingSenderId: '533438911428',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: 'G-6NLBJ6GXHC',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
