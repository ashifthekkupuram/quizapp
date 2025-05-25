import { useEffect, useState } from "react"
import { collection, getDocs, where, query, orderBy } from "firebase/firestore"
import { format } from 'date-fns'

import { auth, db } from '../firebase/firebase'

import NavBar from "./NavBar"

const MAXIMUM_RETRIES = 3

const Profile = () => {

    const [profile, setProfile] = useState('https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')
    const [name, setName] = useState('')
    const [quiz, setQuiz] = useState([])
    const [hardMode, setHardMode] = useState()
    const [normalMode, setNormalMode] = useState()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setProfile(user?.photoURL || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')
            setName(user?.displayName || '')
        })
    }, [])

    useEffect(() => {
        let timeout
        const getQuiz = async (retries) => {
            try {
                const q = query(collection(db, 'quiz'), where('user', '==', auth.currentUser.uid), orderBy('completed_at', 'desc'))
                const response = await getDocs(q)
                const docs = response.docs
                const data = docs.map((doc) => doc.data())
                setQuiz(data)
            } catch (error) {
                if (retries <= 0) {
                    console.error(error)
                    return
                } else {
                    timeout = setTimeout(() => getQuiz(retries - 1), 2500)
                }
            }
        }

        getQuiz(MAXIMUM_RETRIES)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        if (quiz) {
            const hardQuiz = quiz.filter((q) => q.mode === 'Hard')
            const normalQuiz = quiz.filter((q) => q.mode === 'Normal')

            const sumOfHardScores = hardQuiz.map((h) => h.score).reduce((a, b) => a + b, 0)
            const sumOfNormalScores = normalQuiz.map((n) => n.score).reduce((a, b) => a + b, 0)

            const averageHardScore = (sumOfHardScores / hardQuiz.length) || 0
            const averageNormalScore = (sumOfNormalScores / normalQuiz.length) || 0

            setHardMode({ totalGames: hardQuiz.length, averageScore: averageHardScore })
            setNormalMode({ totalGames: normalQuiz.length, averageScore: averageNormalScore })
        }
    }, [quiz])

    return (
        <div className='flex flex-col justify-start items-center gap-2 bg-slate-800 w-full min-h-screen px-6 md:px-12 py-16'>
            <NavBar />
            <div className='flex flex-col justify-center items-center gap-3 w-full bg-slate-600 rounded p-4'>
                <img src={profile} className='h-24 w-24 rounded-full object-contain' />
                <h1 className='text-white font-semibold text-3xl'>{name}</h1>
                <div className='flex justify-center items-center gap-4 text-white'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <h1 className='font-bold'>Normal Mode</h1>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-bold text-3xl'>{normalMode?.totalGames || 0}</h1>
                            <span className='font-bold'>Total Games</span>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-bold text-3xl'>{Math.round(normalMode?.averageScore * 100) / 100 || 0}</h1>
                            <span className='font-bold'>Average Score</span>
                        </div>
                    </div>
                    <div className='border-l-2 h-24 border-slate-800' />
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <h1 className='font-bold'>Hard Mode</h1>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="font-bold text-3xl">{hardMode?.totalGames || 0}</h1>
                            <span className="font-bold">Total Games</span>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className="font-bold text-3xl">{Math.round(hardMode?.averageScore * 100) / 100 || 0}</h1>
                            <span className="font-bold">Average Score</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-3 w-full bg-slate-600 rounded py-4 px-2 md:px-4'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {quiz && quiz.map((q, index) => <div key={index} className='flex flex-col justify-center items-start gap-1 bg-slate-700 rounded p-4 text-white'>
                        <span className='text-xs font-medium text-slate-800'>Date: {format(q.completed_at, 'd/MM/yyyy h:mm aaa')}</span>
                        <h1 className='font-bold'>Score: {q.score}/{q.total_score}</h1>
                        <h1 className='text-xs text-slate-800'>Mode: <span className={`${q.mode === 'Hard' ? 'text-red-700' : 'text-green-700'} font-bold`}>{q.mode}</span></h1>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Profile
