import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: "quizapp-77ea2.firebaseapp.com",
    projectId: "quizapp-77ea2",
    storageBucket: "quizapp-77ea2.firebasestorage.app",
    messagingSenderId: "115164693475",
    appId: "1:115164693475:web:532f78602bf5f7807816d6",
    measurementId: "G-8FZT49BZTR"
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)