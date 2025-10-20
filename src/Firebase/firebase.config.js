// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBmI4HGekRJaP7xDMxhl_IiGb4vhXzbQg",
  authDomain: "uniroll-bdb57.firebaseapp.com",
  projectId: "uniroll-bdb57",
  storageBucket: "uniroll-bdb57.firebasestorage.app",
  messagingSenderId: "889103570953",
  appId: "1:889103570953:web:f28208e3704eec824500d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;