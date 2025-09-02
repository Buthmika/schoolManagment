import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAyYUuq8F_1oG-b09Mb5AaY4Xfp32630cQ",
  authDomain: "schoolstat-d77e6.firebaseapp.com",
  projectId: "schoolstat-d77e6",
  storageBucket: "schoolstat-d77e6.appspot.com", // <-- FIXED
  messagingSenderId: "752810793800",
  appId: "1:752810793800:web:34b780d9b7cd3d2cd9317d",
  measurementId: "G-7MD5H7J1D1"
};

// start firebase
const app = initializeApp(firebaseConfig);

// auth and database
export const auth = getAuth(app);
export const db = getFirestore(app);
