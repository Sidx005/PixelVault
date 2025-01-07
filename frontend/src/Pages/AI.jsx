import React, { useState, useRef } from 'react';
import Together from 'together-ai';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

const AI = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef(null);

  const together = new Together({
    apiKey: import.meta.env.VITE_TOGETHER_API,
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await together.images.create({
        model: 'black-forest-labs/FLUX.1-schnell-Free',
        prompt: input,
        response_format: 'b64_json',
      });
      const base64img = response.data[0].b64_json;
      const dataUrl = `data:image/png;base64,${base64img}`;
      setIsLoading(false);
      setImageUrl(dataUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-5" >
      <Sidebar />
      <div className="mt-10 p-6 w-full mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">AI Image Generator</h1>
        <textarea
          placeholder="Describe the image you want to create..."
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
        />
        <div className=" text-center mb-6">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        {imageUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={imageUrl}
              ref={imageRef}
              alt="Generated"
              className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default AI;
