// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate8.firebaseapp.com",
  projectId: "mern-estate8",
  storageBucket: "mern-estate8.firebasestorage.app",
  messagingSenderId: "643843101564",
  appId: "1:643843101564:web:7df617c83aa74511f94af9",
  measurementId: "G-35KCN09DKG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)