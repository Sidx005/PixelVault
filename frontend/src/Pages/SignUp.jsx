import React, { useContext, useState } from 'react'
import { FormContext } from '../Context'
import { FaEye,FaEyeSlash } from 'react-icons/fa6'
import axios from 'axios'
const SignUp = () => {
    const{show,toggle,setUser,navigate}=useContext(FormContext)
    const [formData,setFormData]=useState({name:'',mail:'',password:''})
    const handlechange=e=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        })
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!formData.name||!formData.mail || !formData.password){
          alert('Enter missing credentials')
          return 
        }
    
       try{ const response=await axios.post('http://localhost:8000/signup',formData)
        if(response.status===201){
          alert('Success')
         navigate('/auth/login')

        }}catch(err){
       
            console.log(err);
            
          const errorMessage = err.response ? err.response.data.error : 'Login failed';
          alert(errorMessage); // Display error from backend
        }
      }   
  return (
  <div className='text-left mt-5 '>
        <h1 className='font-bold'>Sign-Up</h1>
        <form method='POST' onSubmit={handleSubmit} className='flex flex-col gap-2 mt-3' >
       <div>   
          <input onChange={handlechange} value={formData.name} name='name' type="text" className='p-2 bg-white text-gray-300 rounded-md border-2' placeholder='Name'  />
          </div>
          <div>   
          <input onChange={handlechange} value={formData.mail} name='mail' type='email' className='p-2 bg-white text-gray-300 rounded-md border-2' placeholder='E-Mail'  />
          </div>
          <div className='flex items-center gap-2' > 
             <input onChange={handlechange} value={formData.password} name='password' type={`${show?'text':'password'}`} className='p-2 bg-white text-gray-300 rounded-md border-2' placeholder='Password'  />

          <button type='button' onClick={toggle}>{show?<FaEyeSlash/>:<FaEye/>}</button>
        </div>
        <button className='bg-black text-white w-max px-3 py-1 rounded-md' type='submit'>Submit</button>
        </form>
    </div>
)
}

export default SignUp