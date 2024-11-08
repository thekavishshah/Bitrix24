// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDYAptWHwAYC4GoLpO-R_zMMxscKzwseQo",
  authDomain: "deal-sourcing-scraper.firebaseapp.com",
  projectId: "deal-sourcing-scraper",
  storageBucket: "deal-sourcing-scraper.firebasestorage.app",
  messagingSenderId: "54092164401",
  appId: "1:54092164401:web:eee4dfb062cf5c04df5410",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
