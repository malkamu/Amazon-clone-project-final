// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLrz7BTLSTjgToF-6I2kcwwqVY0tnMPcM",
  authDomain: "clone-52347.firebaseapp.com",
  projectId: "clone-52347",
  storageBucket: "clone-52347.firebasestorage.app",
  messagingSenderId: "849153853785",
  appId: "1:849153853785:web:85778b8ee6755cde97e448"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)