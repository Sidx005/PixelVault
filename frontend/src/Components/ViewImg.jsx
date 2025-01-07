import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaX } from 'react-icons/fa6'

const ViewImg = ({ collections,imgView,setImgView, src, setViewImg, setSrc }) => {

  const handleNext = () => {
      const currentIndex = collections?.findIndex((img) => img._id === src.id);
      const nextIndex = (currentIndex + 1) % collections.length;
      setSrc({ id: collections[nextIndex]._id, img: collections[nextIndex].imageUrl });
  };

  const handlePrev = () => {
      const currentIndex = collections?.findIndex((img) => img._id === src.id);
      const prevIndex = (currentIndex + collections.length - 1) % collections.length;
      setSrc({ id: collections[prevIndex]._id, img: collections[prevIndex].imageUrl });
  };

  return (
      <div className={`fixed top-0 left-0 z-50 w-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center min-h-screen h-full`}>
         <FaX onClick={()=>setImgView(!imgView)} className='absolute right-5 top-16 text-2xl text-white'/>
          <div  className="p-5 flex items-center justify-between min-w-72 min-h-56 bg-white rounded-md">
              <button onClick={handlePrev}>
                  <FaArrowLeft />
              </button>
              <img src={src.img} className="w-72 object-cover object-center h-72" alt="" />
              <button onClick={handleNext}>
                  <FaArrowRight />
              </button>
          </div>
      </div>
  );
};


export default ViewImg