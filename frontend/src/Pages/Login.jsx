import React, { useContext, useState } from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
import  { FormContext } from '../Context'
import axios from 'axios'
const Login = () => {
    const {show,toggle, user,
      setUser,navigate}=useContext(FormContext)
      const [formData,setFormData]=useState({mail:'',password:''})
        const handlechange=(e)=>{
            setFormData({
                ...formData,[e.target.name]:e.target.value
            })
        }
    
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!formData.mail || !formData.password){
      alert('Enter missing credentials')
      
      return 
    }

   try{ const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,formData)
    if(response){
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      
      setUser(response.data.user)
      console.log(response.data);
      
      alert('Success')
      navigate('/')
    }}catch(err){

      const errorMessage = err.response ? err.response.data.error : 'Login failed';
      alert(errorMessage); // Display error from backend
    }
  }      
  return (
    <div className='text-left mt-5 '>
        <h1 className='font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3' >
       <div>     <input onChange={handlechange} type="email" name='mail' value={formData.mail} className='p-2 bg-white text-gray-300 rounded-md border-2' placeholder='E-Mail'  /></div>
          <div className='flex items-center gap-2' >  
            <input onChange={handlechange} value={formData.password} name='password' type={`${show?'text':'password'}`} className='p-2 bg-white text-gray-300 rounded-md border-2' placeholder='Password'  />
          <button type='button' onClick={toggle}>{show?<FaEyeSlash/>:<FaEye/>}</button>
        </div>
        <button className='bg-black text-white w-max px-3 py-1 rounded-md' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login