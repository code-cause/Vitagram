import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Default = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [navigate, token]);

  if (token) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          <p className="text-white mt-4">Redirecting to your feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <i 
            data-visualcompletion="css-img" 
            aria-label="Instagram" 
            role="img" 
            style={{
              backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
              backgroundPosition: '0px -52px',
              backgroundSize: 'auto',
              width: '175px',
              height: '51px',
              backgroundRepeat: 'no-repeat',
              display: 'inline-block',
              margin: '0 auto'
            }}
          ></i>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to Instagram Clone</h2>
          <p className="mt-2 text-sm text-gray-600">Share your moments with the world</p>
        </div>

        <div className="space-y-4">
          <Link
            to="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Log In
          </Link>
          
          <Link
            to="/signup"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Get the app</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="flex items-center">
              <img 
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" 
                alt="Download on App Store" 
                className="h-10"
              />
            </a>
            <a href="#" className="flex items-center">
              <img 
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" 
                alt="Get it on Google Play" 
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;