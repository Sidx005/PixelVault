import React from 'react'

const Card = ({direction,src,title1,title2,description}) => {
  return (
   
  <div className={`mt-10 flex items-center gap-5 ${direction === 'row-reverse' ? 'md:flex-row-reverse' : 'md:flex-row'
  } shadow-md  sm:flex-col flex-col p-5 min-w-full max-w-full  `}>

  <img className='md:w-1/2 w-full  object-cover' src={src} alt="img" />
  <div className='md:w-1/2 text-left flex gap-3 flex-col justify-start items-start h-full'>
  <strong className='md:text-4xl text-xl'>{title1} <span className='text-blue-400'>{title2} </span> </strong>
<p className='md:text-2xl'> 
  {description}   
</p>
  </div>
</div>
  )
}

export default Card