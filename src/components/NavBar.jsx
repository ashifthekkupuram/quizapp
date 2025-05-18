import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { IoLogOutOutline } from "react-icons/io5"

import { auth } from '../firebase/firebase'

const NavBar = () => {

    const [profile, setProfile] = useState('https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user.photoURL){
                setProfile(user.photoURL)
            }
        })
    },[])

    return (
        <div className='fixed top-0 flex justify-between items-between w-full px-4 py-4 bg-slate-800 text-white'>
            <h1 className='font-bold'>QuizApp</h1>
            <div className='flex justify-center items-center gap-4'>
                <img src={profile} className='h-8 w-8 rounded-full object-contain' alt="" />
                <IoLogOutOutline onClick={() => signOut(auth)} className='transition-all text-xl hover:text-2xl' />
            </div>
        </div>
    )
}

export default NavBar
