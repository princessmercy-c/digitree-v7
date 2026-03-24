import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

[span_4](start_span)// Your web app's Firebase configuration[span_4](end_span)
const firebaseConfig = {
  apiKey: "AIzaSyD6B9Eqv9GtdTwh04dlSXFW...",
  authDomain: "digitree-f6fcc.firebaseapp.com",
  projectId: "digitree-f6fcc",
  storageBucket: "digitree-f6fcc.firebasestorage.app",
  messagingSenderId: "321946681709",
  appId: "1:321946681709:web:d4e2a142716ead9bab52d4",
  measurementId: "G-XDWEJN6WP9"
};

[span_5](start_span)// Initialize Firebase[span_5](end_span)
const app = initializeApp(firebaseConfig);

[span_6](start_span)// Export Auth so you can use it in your Login page[span_6](end_span)
export const auth = getAuth(app);
