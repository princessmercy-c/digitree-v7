import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6B9Eqv9GtdTwh04dl5XfW-4Ez6Sjfeps",
  authDomain: "digitree-f6fcc.firebaseapp.com",
  projectId: "digitree-f6fcc",
  storageBucket: "digitree-f6fcc.firebasestorage.app",
  messagingSenderId: "321946681789",
  appId: "1:321946681789:web:d4e2a142716ead9bab52d4",
  measurementId: "G-XDWEJN6WP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
