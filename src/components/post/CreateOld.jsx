
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CreateOld = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log('line 13', selectedImage)

  const handleImageChange = (e) => {
    setLoading(true)
    const file = e.target.files[0];
    if (file) {

      const formData = new FormData();
      formData.append('file', file);
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

        .then(res => {
          console.log(res.data)
          // setLoading(true)
          setSelectedImage(res.data.data.file_url)
        })
        .catch(err => console.log(err))
      console.log('line 29', selectedImage)

      // setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = () => {
    // Implement post creation logic here
    alert('Post created!');
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        {!selectedImage ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
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
          </div>
        ) : (
          <>
            {loading && (
              <div className="flex justify-center items-center mb-4">
                <span className="text-blue-500 font-semibold">Loading image...</span>
              </div>
            )}
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 object-cover rounded mb-4"
              onLoad={() => setLoading(false)}
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
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default CreateOld;