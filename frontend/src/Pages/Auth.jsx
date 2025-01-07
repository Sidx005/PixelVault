import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Login from './Login'

const Auth = () => {
  return (
    <div className='flex flex-col  h-full items-center justify-center' >
        <nav className='flex gap-3 bg-gray-200 p-2  justify-center items-center'>
            <Link  to={'login'}>Login</Link>
            <Link to={'signUp'}>Sign-Up</Link>
        </nav>
        <section>
            
            <Outlet/>
        </section>
    </div>
  )
}

export default Auth