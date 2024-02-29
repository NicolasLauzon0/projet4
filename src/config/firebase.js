
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoC7QEfNUYo2GHuRIaltX6cFc2FD4FgZg",
    authDomain: "muzik-b125a.firebaseapp.com",
    projectId: "muzik-b125a",
    storageBucket: "muzik-b125a.appspot.com",
    messagingSenderId: "208078026738",
    appId: "1:208078026738:web:cf9e8a2dbab3be28db9d6b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
