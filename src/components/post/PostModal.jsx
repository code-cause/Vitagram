//delete/ update(PUT)

import React, { useState } from 'react';
import { postApi } from '../../services/Api'

const PostModal = ({ open, onClose, post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState(post?.text || '');
  const [post, setPost] = useState(post);

  if (!open || !post) return null;

  const handleUpdate = () => {
    onUpdate({ ...post, text: caption });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-0 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Post Image */}
        <img
          src={post.image || 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={post.text || 'Post'}
          className="w-full h-80 object-cover rounded-t-lg"
        />
        {/* Caption and Actions */}
        <div className="p-4">
          {isEditing ? (
            <textarea
              className="w-full border rounded p-2 mb-3 text-gray-800"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              autoFocus
            />
          ) : (
            <p className="text-gray-900 mb-3">{post.text || 'No caption.'}</p>
          )}
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => {
                    setIsEditing(false);
                    setCaption(post.text || '');
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => setIsEditing(true)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => onDelete(post.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
