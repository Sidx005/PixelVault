import React, { useContext, useState, useRef, useEffect } from 'react';
import ViewImg from '../Components/ViewImg';
import { FormContext } from '../Context';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaLink, FaPlus, FaSpinner, FaTrash, FaX } from 'react-icons/fa6';
import axios from 'axios';
import{BeatLoader} from 'react-spinners'
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const Gallery = () => {
    const [viewImg, setViewImg] = useState({ id: Number, img: '' });
    const [imgView, setImgView] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null); // Reference for the modal container
    const warn = useRef(null)
    const { galleryImages,token,user } = useContext(FormContext);
    const[images,setImages]=useState([])
    const [imageUrl, setImageUrl] = useState(null);
    const[loading,setLoading]=useState(false)
    const fileInputRef = useRef(null)

    const [file, setFile] = useState(null)
    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const handleFileChnage=(e)=>{
        setFile(e.target.files[0]);
    }
    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const postPhotos=async(e)=>{
        e.preventDefault()
        setLoading(true)
        var allowed = /\.(jpg|jpeg|png|gif)$/i;
        if(!file.name.match(allowed)){
            alert('Invalid')
            setLoading(false)
            return;

        }
        if(!file){
    alert('Select a image')
    return;
   }
   
   const formData=new FormData();
   formData.append('photos',file)
        try {
            const uploadImg=await axios.post('http://localhost:8000/upload',formData,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`,'Content-Type':'multipart/form-data'}})
          if(uploadImg.status===200){
                setImageUrl(uploadImg.data.imageUrl)
                console.log(imageUrl);
                if(fileInputRef.current){
            fileInputRef.current.value=''
            setLoading(false)
        }
        await fetchImg()
        closeModal()

          }
        //   setFile(null)
        
        } catch (error) {
            console.error(error);
            
        }


    }
    const fetchImg=async()=>{
        const response=await axios.get('http://localhost:8000/upload',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        console.log(response.data);
        setImages(response.data?.images)
        console.log(images);
       
        
    }
useEffect(()=>{
    // console.log(localStorage.getItem('token'));
  
    fetchImg()
    
},[])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const deleteImg= async (id) => {
   try{     await axios.delete('http://localhost:8000/upload',{data:{id:id},headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
        await fetchImg()}catch(err){console.error(err);
        }
    }
const disappear=()=>{
    setTimeout(()=>{
       warn.current.style='transform:translateX(-700%);transition:transform 0.5s ease-in-out'
    },3000)
    // return timeout;
}
useEffect(()=>{
    const timeout= disappear()
    return () => {
        clearTimeout(timeout);
    };
},[])

    return (
        <>        
            <Navbar />

        <div className='relative justify-center flex gap-5'>
            <Sidebar/>
            <div style={{width:'calc(100%-17%)'}}>
                <div ref={warn} className="p-3 mt-5  bg-gradient-to-br from-white to-violet-100 font-semibold flex  w-max items-center gap-5  rounded-md shadow-md">If the Photos are not visible,try logging in again !! <FaX/></div>
            <header className='relative mt-20 p-5 flex items-center flex-wrap w-full justify-between'>
                <h1 className='text-xl font-bold'>My Gallery</h1>
                {user?<button
                    onClick={openModal}  // Open modal on click
                    className='text-xl rounded-full text-center items-center flex justify-center  text-blue-500'
                >
                   + Add Photos
                </button>:''}
            </header>

            {/* Modal */}
            {isModalOpen && (
                <div className='fixed z-50 inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center'>
                
                    <div
                        ref={modalRef} 
                        className='bg-white p-6 rounded-lg shadow-lg w-96'
                    >
                        <h2 className='text-xl font-bold'>Add New Image</h2>
                        <form encType='multipart/form-data' onSubmit={postPhotos}>
                            <input ref={fileInputRef}
                            onChange={handleFileChnage}
                                type='file'
                                name='image'
                                accept='image/*'
                                className='w-full p-2 my-4 border border-gray-300 rounded-md'
                            />
                            <div className='flex gap-4 justify-end'>
                                <button disabled={loading} type='submit' className='bg-blue-500 p-1 rounded-md text-white'>
                                    {loading?<BeatLoader/>:'Submit'}
                                </button>
                                <button
                                    type='button'
                                    onClick={closeModal} 
                                    className='bg-red-500 text-white px-4 py-2 rounded-md'
                                >
                                    Close
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            <section className='flex mb-5 items-center justify-center mt-10'>

                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
                    {images?.map((img, index) => (
                        <div className='w-72 p-2 gap-5 overflow-hidden items-start shadow-md flex flex-col' key={index}>
                            <img
                                onClick={() => {
                                    setImgView(true);
                                    setViewImg({ id: Number(img._id), img: img.imageUrl });
                                }}
                                className='h-48 object-cover w-72'
                                src={img.imageUrl}
                                alt=""
                            />
                            <p><b>Uploaded at: </b>{new Date(img?.uploadedAt).toLocaleDateString()}</p>
                            <p><FaLink/> <Link to={`${img?.imageUrl}`} className='text-blue-400  underline'>{img?.imageUrl}</Link ></p>
                         <button onClick={()=>deleteImg(img?._id)}><FaTrash className='text-red-500'/></button>
                       </div>
                    ))}
                </div>
            </section>
            {imgView?<ViewImg src={viewImg} setSrc={setViewImg} collections={images} setImgView={setImgView} imgView={imgView}  />:''}
            </div>    
                </div>

            <Footer />
        </>
    );
};

export default Gallery;
