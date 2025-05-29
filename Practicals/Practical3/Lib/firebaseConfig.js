// Import the functions you need from the SDKs you need
// Import the functions you need from the   SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCFh2BXf_cwfMUHdwZCk5A24ytpobuTPY",
    authDomain: "to-do-lists-aa5f6.firebaseapp.com",
    projectId: "to-do-lists-aa5f6",
    storageBucket: "to-do-lists-aa5f6.firebasestorage.app",
    messagingSenderId: "332578649010",
    appId: "1:332578649010:web:c588715ab61f9f1859aaab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);