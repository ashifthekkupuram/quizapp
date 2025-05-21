import { useEffect } from "react"
import { collection, addDoc } from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

const MAXIMUM_RETRIES = 3

const Result = ({ setStart, correctAnswers, setCorrectAnswers, setResult, setQuestions, questions, hardMode }) => {

    const onHome = async () => {
        setStart(false)
        setQuestions(null)
        setResult(false)
        setCorrectAnswers(0)
    }

    useEffect(() => {
        let timeout
        const data = {
            total_score: questions.length,
            score: correctAnswers,
            user: auth?.currentUser?.uid,
            mode: hardMode ? 'Hard' : 'Normal',
            completed_at: new Date()
        }
        const saveQuiz = async (retries) => {
            try {
                await addDoc(collection(db, 'quiz'), data)
            } catch (error) {
                if (retries <= 0) {
                    return
                }
                timeout = setTimeout(() => saveQuiz(retries - 1), 2500)
            }
        }

        saveQuiz(MAXIMUM_RETRIES)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-800 w-full h-screen'>
            <h1 className='text-white text-4xl font-bold'>{correctAnswers} out of {questions.length} is correct</h1>
            <button className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200' onClick={onHome}>Home</button>
        </div>
    )
}

export default Result
