// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOur8UkfK1DReBn3_OZ3X6lvTmaplglhA",
  authDomain: "clone-ff6c4.firebaseapp.com",
  databaseURL: "https://clone-ff6c4-default-rtdb.firebaseio.com",
  projectId: "clone-ff6c4",
  storageBucket: "clone-ff6c4.appspot.com",
  messagingSenderId: "968345715607",
  appId: "1:968345715607:web:3668aeded8b976e51c3ad2",
  measurementId: "G-8ML22Z3BKX"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth =getAuth();


export { db,auth};

