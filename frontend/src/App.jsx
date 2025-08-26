import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from'./components/Home'

import Signup from './components/auth/Signup.jsx';
import Login from './components/auth/Login.jsx';

  import { Link } from "react-router-dom"

const appRouter=createBrowserRouter(
  [
    {
      path:'/',
      element:<Home/>
    },
     {
      path:'/login',
      element:<Login/>
    },
     {
      path:'/signup',
      element:<Signup/>
    },
   

  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
