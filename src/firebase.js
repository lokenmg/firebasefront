// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBMCm5WC8g2CD7Vu43VtT__F01pIg5on50",

  authDomain: "peliculasnosql.firebaseapp.com",

  projectId: "peliculasnosql",

  storageBucket: "peliculasnosql.appspot.com",

  messagingSenderId: "46511343029",

  appId: "1:46511343029:web:8a794ce3d3ab163a8b45fc",

  measurementId: "G-6KMPZR6GQV"

};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  storage,
  firestore as default,
  app,
  auth
};