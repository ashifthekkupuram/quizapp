import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: 'AIzaSyD4Cbd3GRiYII2xFDtX3eZ-lTk5oTi2USE',
    authDomain: "quizapp-77ea2.firebaseapp.com",
    projectId: "quizapp-77ea2",
    storageBucket: "quizapp-77ea2.firebasestorage.app",
    messagingSenderId: "115164693475",
    appId: "1:115164693475:web:052e8d02464cdb807816d6",
    measurementId: "G-PTE8MQ9YCR"
}



export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)