import { useEffect, useState } from "react"
import { collection, getDocs, where, query } from "firebase/firestore"

import { auth, db } from '../firebase/firebase'

import NavBar from "./NavBar"

const MAXIMUM_RETRIES = 3

const Profile = () => {

    const [profile, setProfile] = useState('https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')
    const [name, setName] = useState('')
    const [quiz, setQuiz] = useState([])
    const [hardModeScore, setHardModeScore] = useState(null)
    const [normalModeScore, setNormalModeScore] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setProfile(user.photoURL || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')
            setName(user.displayName || '')
        })
    }, [])

    useEffect(() => {
        let timeout
        const getQuiz = async (retries) => {
            try{
                const q = query(collection(db,'quiz'), where('user', '==', auth.currentUser.uid))
                const data = await getDocs(q)
                setQuiz(data.docs)
            } catch(error) {
                if(retries <= 0){
                    return
                }else{
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
        if(quiz){
            const hard = quiz.filter((q) => q.data.mode === 'Hard')
            const normal = quiz.filter((q) => q.data.mode === 'Normal')

            setHardModeScore({ totalPlays: hard.length})
            setNormalModeScore({ totalPlays: normal.length})
        }
    },[quiz])

    return (
        <div className='flex flex-col justify-start items-center bg-slate-800 w-full h-screen px-6 md:px-12 py-16'>
            <NavBar />
            <div className='flex flex-col justify-center items-center gap-3 w-full bg-slate-600 rounded p-4'>
                <img src={profile} className='h-24 w-24 rounded-full object-contain' alt={name} />
                <h1 className='text-white font-semibold text-3xl'>{name}</h1>
                { hardModeScore && hardModeScore }
                { normalModeScore && hardModeScore }
            </div>
        </div>
    )
}

export default Profile
