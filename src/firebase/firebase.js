import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD4Cbd3GRiYII2xFDtX3eZ-lTk5oTi2USE",
    authDomain: "quizapp-77ea2.firebaseapp.com",
    projectId: "quizapp-77ea2",
    storageBucket: "quizapp-77ea2.firebasestorage.app",
    messagingSenderId: "115164693475",
    appId: "1:115164693475:web:714436d810f9e7cc7816d6",
    measurementId: "G-VE8ML5E5XL"
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)