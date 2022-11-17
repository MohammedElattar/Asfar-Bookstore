import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoXlcw_Dwd7jqu7ps12ma5Le4xagkF2eo",
  authDomain: "nextjs-bookstore.firebaseapp.com",
  projectId: "nextjs-bookstore",
  storageBucket: "nextjs-bookstore.appspot.com",
  messagingSenderId: "230614076257",
  appId: "1:230614076257:web:d6e736aadec2253c035320",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
