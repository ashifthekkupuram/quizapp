import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { auth } from '../firebase/firebase'

const AuthRequired = () => {

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(!user) navigate('/signin')
    })
  },[])

  return <Outlet />
}

export default AuthRequired
