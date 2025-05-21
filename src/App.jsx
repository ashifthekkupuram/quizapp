import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import AuthRequired from './components/AuthRequired'
import AuthRedirect from './components/AuthRedirect'
import Profile from "./components/Profile"

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthRequired />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    },
    {
      path: '/',
      element: <AuthRedirect />,
      children: [{
        path: '/signin',
        element: <SignIn />
      }]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
