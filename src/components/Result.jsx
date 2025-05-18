import { useEffect } from "react"
import { collection, addDoc } from "firebase/firestore"

import NavBar from "./NavBar"
import { auth, db } from "../firebase/firebase"

const Result = ({ setStart, correctAnswers, setCorrectAnswers, setResult, setQuestions, questions }) => {

    const onHome = async () => {

        try {
            await addDoc(collection(db, 'quiz'), {
                total_score: questions.length,
                score: correctAnswers,
                user: auth?.currentUser?.uid,
                completed_at: new Date()
            })
        } catch (error) {
            console.log(error)
        }


        setStart(false)
        setQuestions(null)
        setResult(false)
        setCorrectAnswers(0)
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-800 w-full h-screen'>
            <NavBar />
            <h1 className='text-white text-4xl font-bold'>{correctAnswers} out of {questions.length} is correct</h1>
            <button className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200' onClick={onHome}>Save and Go Home</button>
        </div>
    )
}

export default Result
