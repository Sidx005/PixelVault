import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-blue-600 rounded-md shadow-xl text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo Section */}
          <div className="text-2xl font-bold mb-6 md:mb-0">
            <h2 className="text-white">PhotoGallery</h2>
            <p className="text-gray-300 text-sm">Capture & Share Your Moments</p>
          </div>

          {/* Navigation Links */}
          <div className="flex md:flex-row flex-col justify-center gap-5 mb-6 md:mb-0">
            <a href="#about" className="hover:text-blue-300 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-300 transition-colors">Contact</a>
            <a href="#privacy" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-300 transition-colors">Terms of Service</a>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-2xl hover:text-blue-300 transition-colors">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
          <div className="flex list-none gap-3 flex-row  justify-between">
            <li><FaInstagram/></li>
            <li><FaFacebook/></li>
            <li><FaTwitter/></li>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>&copy; 2025 PhotoGallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
