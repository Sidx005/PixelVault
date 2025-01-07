import React from 'react';
import Navbar from '../Components/Navbar';
import Marquee from '../Components/Marquee';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
const description1="Capture life’s unforgettable moments and store them securely in your personalized gallery. Relive every special memory, anytime, anywhere."
const description2='Upload stunning photos effortlessly. Build a collection that reflects your unique perspective and creative journey.'
const About = () => {
  return (
    <>
      <Navbar />
      <div className="w-full items-center flex flex-col min-h-screen h-full">
        <h1 className="mt-24 text-5xl font-bold">
          About{' '}
          <span className="bg-gradient-to-br from-blue-300 via-blue-600 to-blue-800 bg-clip-text text-transparent italic">
            Us
          </span>
        </h1>
        <p className="text-xl mt-5 text-gray-500">Create Memories, Add Photos, Share Photos</p>
     <Marquee/>
<Card  title1={'Create'}  title2={'Memories'} description={description1} src={"https://petapixel.com/assets/uploads/2013/07/memories.jpg"} direction={'row-reverse'}/>
<Card title1={'Add'} title2={'Photos'} description={description2} src={'https://t3.ftcdn.net/jpg/10/16/70/00/360_F_1016700000_VGSVDCSGrXH4DNQ7mwqzQMVhwObK7gyO.jpg'} direction={'row'}/>

      </div>
      <Footer/>
    </>
  );
};

export default About;
