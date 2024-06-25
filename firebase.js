// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAYWHIZRfYo8gVV7YYmp9ft5dDiHif5EEE",
    authDomain: "bytes-16ffa.firebaseapp.com",
    databaseURL: "https://bytes-16ffa-default-rtdb.firebaseio.com",
    projectId: "bytes-16ffa",
    storageBucket: "bytes-16ffa.appspot.com",
    messagingSenderId: "902656103797",
    appId: "1:902656103797:web:18a0e7948d0fcf5215ef3c",
    measurementId: "G-2JXHKEHVMR"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
