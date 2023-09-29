// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection } from 'firebase/firestore';
// import {moviesRef} from "..firebase/firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhCsoQHCPZYN5wDSWeOrJ5q5PmSuQMnk8",
  authDomain: "filmyfan-aa4b3.firebaseapp.com",
  projectId: "filmyfan-aa4b3",
  storageBucket: "filmyfan-aa4b3.appspot.com",
  messagingSenderId: "732126631221",
  appId: "1:732126631221:web:8e6008adc3079e26c2687c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviwRef=collection(db,"review");
export const userRef=collection(db,"user");
export default app;


