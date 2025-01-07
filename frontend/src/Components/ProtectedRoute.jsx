import React, { useContext } from 'react';
import { FormContext } from '../Context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useContext(FormContext);

  
  if(loading){
   return <div>Loading ...</div>
  }
  if(!user){
    return <Navigate to={'/auth'}/>
  }

  return children;
};

export default ProtectedRoute;
