import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebase"

const AuthRedirect = () => {

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) navigate('/')
    })
  },[])

  return <Outlet /> 
}

export default AuthRedirect
