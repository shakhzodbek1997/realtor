
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHiCDKQTmkI7oSECj6eYEqG_L1QEjzvgs",
  authDomain: "realtor-d3fa7.firebaseapp.com",
  projectId: "realtor-d3fa7",
  storageBucket: "realtor-d3fa7.appspot.com",
  messagingSenderId: "1022643095073",
  appId: "1:1022643095073:web:7668fbc1b420ed59c34560"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();