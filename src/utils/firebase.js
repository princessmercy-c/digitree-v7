import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "digitree-v6.firebaseapp.com",
  projectId: "digitree-v6",
  storageBucket: "digitree-v6.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for use in Login/Signup components
export const auth = getAuth(app);
export const db = getFirestore(app);


