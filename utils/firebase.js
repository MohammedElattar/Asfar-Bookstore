import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnRVXMKByMxJj5ATK2mav9rAqKnV68ADU",
  authDomain: "asfar-bookstore.firebaseapp.com",
  projectId: "asfar-bookstore",
  storageBucket: "asfar-bookstore.appspot.com",
  messagingSenderId: "1048283756312",
  appId: "1:1048283756312:web:168e11dd7d8b2172e3506d",
};

// console.log(firebase);

const app = initializeApp(firebaseConfig, "APP");
export const db = getFirestore(app);

export const auth = getAuth(app);
