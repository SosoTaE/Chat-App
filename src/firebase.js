// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBypc1HGN-skDXpgpSJ9qLIRhcbw91VC1w",
  authDomain: "chat-297dd.firebaseapp.com",
  databaseURL: "https://chat-297dd-default-rtdb.firebaseio.com",
  projectId: "chat-297dd",
  storageBucket: "chat-297dd.appspot.com",
  messagingSenderId: "461948360936",
  appId: "1:461948360936:web:4251550bb4ea373efed15d",
  measurementId: "G-NVNT4853F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {db,auth,provider}