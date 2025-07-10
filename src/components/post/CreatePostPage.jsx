// //throattling, loading feature

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { postApi } from '../../services/Api'
import { ClipLoader } from "react-spinners";

const CreatePostPage = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/upload/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(res => {
          setSelectedImage(res.data.data.file_url);
          console.log(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  const handleCreatePost = async () => {
    if (!selectedImage || !caption) {
      alert('Please upload an image and enter a caption.');
      return;
    }
    setLoading(true);
    try {
      // await axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/create/`, {
      await postApi.createPost( {
        text: caption,
        image: selectedImage
      });
      alert('Post created!');
      navigate('/');
    } catch (err) {
      alert('Failed to create post.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('userData');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

        {!selectedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            {!loading && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer text-blue-500 font-semibold">
                  Upload Photo
                </label>
              </>
            )}
            {loading && (
              <div className="flex justify-center items-center">
                <ClipLoader color="#3b82f6" size={32} />
              </div>
            )}
          </div>
        ) : (
          <>
            {loading && (
              <div className="flex justify-center items-center mb-4">
                <ClipLoader color="#3b82f6" size={32} />
              </div>
            )}
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 object-cover rounded mb-4"
              style={{ display: loading ? 'none' : 'block' }}
            />
          </>
        )}


        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="3"
        />
        <button
          onClick={handleCreatePost}
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Share'}
        </button>
        <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-100 w-full"
              >
                <span>Log out</span>
              </button>
      </div>
      
    </div>
  );
};

export default CreatePostPage;

