import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { IoLogOutOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase/firebase'

const NavBar = () => {

    const [profile, setProfile] = useState('https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user.photoURL){
                setProfile(user.photoURL || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg')
            }
        })
    },[])

    return (
        <div className='fixed top-0 flex justify-between items-between w-full px-4 py-4 bg-slate-800 text-white'>
            <h1 onClick={() => navigate('/')} className='font-bold cursor-pointer'>Quiz App</h1>
            <div className='flex justify-center items-center gap-4'>
                <img onClick={() => navigate('/profile')} src={profile} className='h-8 w-8 rounded-full object-contain hover:border-slate-900 hover:border-2 hover:scale-115' alt="" />
                <IoLogOutOutline onClick={() => signOut(auth)} className='transition-all text-xl hover:text-2xl' />
            </div>
        </div>
    )
}

export default NavBar
