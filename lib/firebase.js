import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyD8v5aDJTDDKEZYwUtjTkvbtIDLnstpwpc",
  authDomain: "graphite-space-401606.firebaseapp.com",
  projectId: "graphite-space-401606",
  storageBucket: "graphite-space-401606.appspot.com",
  messagingSenderId: "127664092637",
  appId: "1:127664092637:web:c8b501358a5bbf9003f234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
