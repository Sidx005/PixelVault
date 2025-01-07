/* Sidebar Component */
import React from 'react';
import { FaBars, FaBox, FaCamera, FaClipboard, FaDrawPolygon, FaPaintbrush, FaPaintRoller, FaPhotoFilm, FaRobot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
    <div className="min-h-screen relative z-30 md:flex hidden top-0 w-1/6 text-black p-4 shadow-lg">
      <div className="flex flex-col sticky top-5 overflow-y-auto  space-y-6">

        <div className="text-xl font-semibold"><FaBars/></div>
        <div className="space-y-4">
          <Link className='flex gap-3 items-center' to={'/gallery'} ><FaPhotoFilm/><span>Gallery</span></Link>
          <Link to={'/imgGen'} className='flex gap-3 items-center' ><FaRobot/><span>AI img</span></Link>
          <Link to={'/canvas'} className='flex gap-3 items-center' ><FaPaintRoller/><span>Canvas</span></Link>
        </div>
      </div>
    </div>
    <div className="fixed lg:hidden md:hidden z-50 flex sm:flex bg-white justify-center gap-5 p-5 left-1/2 -translate-x-1/2 bottom-5 shadow-md rounded-md w-56 ">
      <Link to={'/gallery'} ><FaCamera/></Link>
      <Link to={'/imgGen'}><FaRobot/></Link>
      <Link to={'/canvas'}><FaPaintRoller/></Link>
      
    </div>
    </>
  );
};

export default Sidebar;
