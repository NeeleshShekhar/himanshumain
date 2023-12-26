// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy9S4vq_pvbn3EPlkf7NCkuDOsdcZLc1A",
  authDomain: "neelesh-blog-new.firebaseapp.com",
  projectId: "neelesh-blog-new",
  storageBucket: "neelesh-blog-new.appspot.com",
  messagingSenderId: "350909238894",
  appId: "1:350909238894:web:bd09ce0c0cb9eeff3ca07f",
  measurementId: "G-95WC2SVNJ3"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
