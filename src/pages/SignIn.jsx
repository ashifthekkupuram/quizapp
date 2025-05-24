import { useState } from "react"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"

import { auth } from "../firebase/firebase"

const SignIn = () => {

    const [error, setError] = useState(null)

    const googleProvider = new GoogleAuthProvider()

    const googleAuth = async () => {
        setError(null)
        try{

            await signInWithPopup(auth, googleProvider)

        } catch(error){
            setError(error.message)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center  bg-slate-800 w-full h-screen transition-all'>
            <div className='flex flex-col justify-center items-center bg-slate-600 p-4 rounded text-white'>
                <h1 className='font-bold text-3xl mb-2'>Sign In</h1>
                {error && <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     {error}
                </div>}
                <button onClick={googleAuth} className="rounded-md flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <img
                        src="https://docs.material-tailwind.com/icons/google.svg"
                        alt="metamask"
                        className="h-5 w-5 mr-2"
                    />
                    Continue with Google
                </button>
                <button onClick={googleAuth} className="rounded-md flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <img
                        src="https://docs.material-tailwind.com/icons/google.svg"
                        alt="metamask"
                        className="h-5 w-5 mr-2"
                    />
                    Continue with Google
                </button>
            </div>
        </div>
    )
}

export default SignIn
