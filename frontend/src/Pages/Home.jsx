import React, { useContext, useRef } from 'react';
import { FormContext } from '../Context';
import { Link } from 'react-router-dom';
import bg from '../assets/Bg.png';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import image from '../assets/Demo.png'
import LinkImg from '../assets/image.png'
// motion
import { motion, useInView } from 'framer-motion';
import Card from '../Components/Card';

const Home = () => {
  const { user, galleryImages } = useContext(FormContext);

  // const [ref, inView] = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5, // 50% of the section in view triggers the animation
  // });
  const ref=useRef(null)
  const isInView=useInView(ref,{once:true})

  return (
    <div className='p-2 flex flex-col gap-10'>
      <Navbar />
      <section
        className="p-7 overflow-x-hidden gap-7 min-h-56 flex flex-col items-center justify-center rounded-xl shadow-xl text-white shadow-gray-400"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <h1 className='text-5xl font-bold'>
          {user ? `Welcome ${user?.name}` : 'Add your photos and Create Memories'}
        </h1>
        <button className='bg-white text-blue-500 text-lg p-5 rounded-xl shadow-xl font-bold'>
          <Link to={'/gallery'}>Add Photos</Link>
        </button>
      </section>

      <section className='mt-20 text-center'>
        <h1 className='text-center text-3xl bg-gradient-to-br from-blue-100 to-blue-700 bg-clip-text text-transparent'>Our Services</h1>

<Card src={image} description={'Add multiple photos and store it on cloud and use it whenever you want!!'} title1={'Add'} title2={'Photos'} direction={'row-reverse'}/>
<Card src={LinkImg} description={'Download images or Share with your friends with our link!!'} title1={'Share'} title2={'Photos'} direction={'row'}/>

      </section>

      <motion.section style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }} ref={ref}
    
        className="flex overflow-auto rounded-md shadow-md shadow-black p-7 flex-col items-center justify-center"
      >
        <h1 className='font-bold text-3xl text-wrap md:text-5xl'>Collections</h1>
        <div className="grid mt-5 gap-2 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
          {galleryImages.map((img) => (
            <div key={img.id} className="w-96 max-w-full flex-shrink-0 md:w-auto h-64 shadow-md">
              <img className='w-full object-cover h-full' src={img.img} />
            </div>
          ))}
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default Home;
