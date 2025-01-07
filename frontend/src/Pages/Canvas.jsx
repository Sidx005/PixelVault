import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { FaDownload } from 'react-icons/fa6';

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState('#000');
  const[bg,setBg]=useState('white')

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas on load
  }, []);

  const draw = (e) => {
    e.preventDefault()
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const startDraw = (e) => {
    e.preventDefault()
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color; 

    // Attach event listeners to continue drawing
    document.addEventListener('mousemove', draw);
    document.addEventListener('mouseup', stopDraw);
    document.addEventListener('mouseleave', stopDraw);
  };

  const stopDraw = () => {
    const canvas = canvasRef.current;
    document.removeEventListener('mousemove', draw); // Corrected event listener method
    document.removeEventListener('mouseup', stopDraw); // Corrected event listener method
  };
  const clearCanvas=()=>{
    const canvas=canvasRef.current;
    const ctx=ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Corrected dimensions
  }
  function saveDrawing(){
    const canvas=canvasRef.current;
    if( ctxRef.current){
      const link=document.createElement('a')
     link.href=canvas.toDataURL('image/png')
     link.download='drawing.png'
     link.click()
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full gap-5">
        <Sidebar />
        <div className="min-h-screen w-full flex flex-col p-5 ">
      <div className="flex gap-3 " >
          <input className='rounded-full h-10 w-10 border-0 outline-none'
            value={color}
            id='color'
            onChange={(e) => setColor(e.target.value)} 
            type="color"
          />
          <label htmlFor="color">Choose brush color</label>
          <input   className='rounded-full  h-10 w-10 border-0 outline-none' value={bg} onChange={e=>setBg(e.target.value)} type="color" name="" id="bg" />
          <label htmlFor="bg">Choose canvas color</label>
    
       </div>
          <div style={{backgroundColor:bg}} className={`  overflow-x-hidden mt-5 flex flex-col items-center gap-5 shadow-md p-2`}>
            <canvas  className={`border  border-md cursor-crosshair`}  width={400} height={400}
              onMouseDown={startDraw}
              
              ref={canvasRef}
            ></canvas>
            <button  className='border p-2 w-20 bg-gray-200 border-black' onClick={clearCanvas}>Clear</button>
          <button onClick={saveDrawing} className='flex gap-5 bg-white p-3 items-center border border-black'><FaDownload/>Save Image</button>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Canvas;
