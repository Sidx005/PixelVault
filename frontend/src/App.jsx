import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Gallery from './Pages/Gallery'
import Home from './Pages/Home'
import { FormContext } from './Context'
import ProtectedRoute from './Components/ProtectedRoute'
import About from './Pages/About'
import Canvas from './Pages/Canvas'
import AI from './Pages/AI'

function App() {
  const [count, setCount] = useState(0)
const {user} = useContext(FormContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='auth' element={<Auth/>}>
        <Route index element={<Login/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signUp' element={<SignUp/>}/>
          </Route>
          <Route path='/gallery'  element={<ProtectedRoute><Gallery/></ProtectedRoute>}/>
          <Route path='/canvas' element={<ProtectedRoute><Canvas/></ProtectedRoute>}/>
          <Route path='/imgGen' element={<ProtectedRoute><AI/></ProtectedRoute>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
