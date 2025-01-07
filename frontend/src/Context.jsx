import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const FormContext=createContext()
import {useNavigate} from 'react-router-dom'

const Context = ({children}) => {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const[token,setToken]=useState(localStorage.getItem('token'))
  const navigate=useNavigate()

  const galleryImages=[{
    id:1,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s'
     },{
    id:2,
    img:'https://www.shutterstock.com/image-photo/calm-weather-on-sea-ocean-600nw-2212935531.jpg'
     }
 ,{
    id:3,
    img:'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg'
     }
 ,{
    id:4,
    img:'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg'
     }
 ,{
    id:5,
    img:'https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q='
     }
 ,{
    id:6,
    img:'https://i0.wp.com/picjumbo.com/wp-content/uploads/mysterious-fantasy-forest-with-old-bridges-free-image.jpg?w=600&quality=80'
     }
 
 
 ]
  const toggle=()=>{
    setShow(!show)
}

useEffect(()=>{
  const storedToken=localStorage.getItem('token')
  const storedUser=localStorage.getItem('user')
  if(storedToken&&storedUser){
   setToken(storedToken)
   setUser(JSON.parse(storedUser))
  }else{
    setUser(null)
    setToken(null)
    navigate('/auth'); // Redirect to the auth page if no token or user

  }
  setLoading(false)
},[])
const logOut=async()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  setToken(null)
  setUser(null)
}
const values={
    show,setShow,toggle, user,loading,
    setUser,navigate,galleryImages,logOut
}
  return (
    <FormContext.Provider value={values}>
        {children}
    </FormContext.Provider>
  )
}

export default Context