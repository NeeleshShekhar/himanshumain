// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa2EEaq6allraWA_u5EKWJ2_kfZ2p49OM",
  authDomain: "himanshumotia-196d9.firebaseapp.com",
  projectId: "himanshumotia-196d9",
  storageBucket: "himanshumotia-196d9.appspot.com",
  messagingSenderId: "172912728925",
  appId: "1:172912728925:web:bb7427df232d65480226b4",
  measurementId: "G-5TJC05JQNY"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
// Export Firestore instance
export const db = getFirestore(app);

// Export Auth instance
export const auth = getAuth(app);
