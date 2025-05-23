import { useEffect, useState } from "react"
import { collection, addDoc } from "firebase/firestore"

import { auth, db } from "../firebase/firebase"

const MAXIMUM_RETRIES = 3

const Result = ({ setStart, correctAnswers, setCorrectAnswers, setResult, setQuestions, questions, hardMode }) => {

    const [loading, setLoading] = useState(false)

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
            completed_at: Date.now()
        }
        const saveQuiz = async (retries) => {
            setLoading(true)
            try {
                await addDoc(collection(db, 'quiz'), data)
                setLoading(false)
            } catch (error) {
                if (retries <= 0) {
                    setLoading(false)
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
            <button disabled={loading} className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200 disabled:opacity-30 disabled:bg-white' onClick={onHome}>{loading ? 'Saving...' : 'Go Home'}</button>
        </div>
    )
}

export default Result
