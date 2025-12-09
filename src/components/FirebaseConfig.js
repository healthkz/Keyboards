
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlk0S5cq0zZKYdsRYET5gUusrIHQwrL_s",
  authDomain: "backend-xas.firebaseapp.com",
  projectId: "backend-xas",
  storageBucket: "backend-xas.firebasestorage.app",
  messagingSenderId: "1092677458128",
  appId: "1:1092677458128:web:e029e9f7a4555314ebe6d5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 