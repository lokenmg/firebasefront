// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClodWq5ZVSG38FEfmQPxB4HY-x2LIuAyk",
  authDomain: "peliculas-27004.firebaseapp.com",
  projectId: "peliculas-27004",
  storageBucket: "peliculas-27004.appspot.com",
  messagingSenderId: "593234182523",
  appId: "1:593234182523:web:a6d4053122915331e67dde",
  measurementId: "G-9DS8Y695MP"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();
export {
  storage,
  firestore as default
};