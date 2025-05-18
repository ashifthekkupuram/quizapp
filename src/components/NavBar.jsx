import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { IoLogOutOutline } from "react-icons/io5"

import { auth } from '../firebase/firebase'

const NavBar = () => {

    console.log(auth?.currentUser?.photoURL)

    return (
        <div className='fixed top-0 flex justify-between items-between w-full px-4 py-4 bg-slate-800 text-white'>
            <h1 className='font-bold'>QuizApp</h1>
            <div className='flex justify-center items-center gap-4'>
                <img src={auth?.currentUser?.photoURL} className='h-8 w-8 rounded-full object-contain' alt="" />
                <IoLogOutOutline onClick={() => signOut(auth)} className='transition-all text-xl hover:text-2xl' />
            </div>
        </div>
    )
}

export default NavBar
