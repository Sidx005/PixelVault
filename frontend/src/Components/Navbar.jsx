import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bg from '../assets/Bg.png'
import { FaCamera, FaCameraRetro } from 'react-icons/fa6';
import { FormContext } from '../Context';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const{user,token,logOut,navigate}=useContext(FormContext)
  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className="bg sticky top-0 z-50 left-0 rounded-2xl text-black bg-white shadow-lg py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/" className='flex gap-3 items-center bg-gradient-to-r from-blue-700 via-blue-600 to-red-500 bg-clip-text text-transparent'><FaCameraRetro className='text-blue-400'/>PixelVault</Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex space-x-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className=" p-1 cursor-pointer transition-all"
          >
            <Link to="/" className="text-lg hover:text-blue-400">
              Home
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className=" p-1 cursor-pointer transition-all"
          >
            <Link to="/about" className="text-lg hover:text-blue-400">
              About
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className=" p-1 cursor-pointer transition-all"
          >
            <Link to="/gallery" className="text-lg hover:text-blue-400">
              Services
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className=" p-1 cursor-pointer transition-all"
          >
      
          </motion.div>
           <motion.div onClick={user?logOut:()=>navigate('/auth')}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer text-lg bg-blue-600 text-white p-1 rounded-md transition-all"
          >
                     {user?'Logout':'Login'}

          </motion.div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl"
          >
            {isMenuOpen ? "X" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed min-h-screen flex flex-col  items-start text-left  top-0 left-0 w-1/2  text-white py-4 px-6 space-y-4"
       style={{backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}}
      >
        {/* <button><FaX</button> */}
        <Link to="/" className="text-lg mt-36 hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="text-lg hover:text-blue-400">
          About
        </Link>
        <Link to="/gallery" className="text-lg hover:text-blue-400">
          Services
        </Link>
    
        <Link><button onClick={()=>!user?navigate('/auth'):logOut()}>{user ?'Logout':'Login'}</button></Link>
      </motion.div>
    </nav>
  );
};

export default Navbar;
