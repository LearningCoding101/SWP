// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFv0vgWt20HdOaSO--iI32bItMczfn_lg",
  authDomain: "projectswp-9019a.firebaseapp.com",
  projectId: "projectswp-9019a",
  storageBucket: "projectswp-9019a.appspot.com",
  messagingSenderId: "9214086109",
  appId: "1:9214086109:web:fc6fb91c7beb21b9830434",
  measurementId: "G-KCHT2CF92Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();