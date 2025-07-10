
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Settings } from 'react-feather';
// import { userApi, postApi } from '../services/Api';
// import { userContext } from '../components/layout/Context';


// const ProfilePage = () => {
//   const navigate = useNavigate();

//   // State
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [caption, setCaption] = useState('');

//   // Context (optional, if you use it elsewhere)
//   const { username,setUsername} = useContext(userContext);

//   // Get user data from localStorage for fallback
//   const data = localStorage.getItem('userData');
//   console.log("data after signup", data);
//   const parsedData = data ? JSON.parse(data) : {};

//   useEffect(() => {
//     fetchUserProfile();
//     fetchMyPosts();
//     // eslint-disable-next-line
//   }, []);

//   // Fetch posts
//   const fetchMyPosts = async () => {
//     try {
//       const response = await postApi.getMyPosts();
//       if (response.data.success) {
//         setPosts(response.data.data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch posts:', err);
//     }
//   };

//   // Fetch profile
//   const fetchUserProfile = async () => {
//     try {
//       if (!parsedData._id) {
//         setError('User not found. Please log in again.');
//         setLoading(false);
//         return;
//       }
//       const response = await userApi.getProfile(parsedData["_id"]);
//       if (response.data.success) {
//         setProfile(response.data.data);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       console.error('Profile fetch error:', err);
//       setError('Failed to fetch profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete post
//   const handleDelete = async (id) => {
//     try {
//       await postApi.deletePost(id);
//       setPosts(posts.filter((p) => p._id !== id));
//       setModalOpen(false);
//     } catch (err) {
//       console.error("Failed to delete:", err);
//     }
//   };

//   // Loading and error states
//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }
//   if (error) {
//     return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
//   }

//   // Profile image (could use user's image if you have it)
//   const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";

//   // // Fallbacks for name and email
//   const displayName = profile?.name || parsedData?.name || username || "Unknown User";
//   const displayEmail = profile?.email || parsedData?.email || "";

//   return (
//     <div className="max-w-5xl mx-auto pt-16 px-4">
//       <div className="flex items-start mb-8">
//         <div className="w-[150px] h-[150px] rounded-full overflow-hidden mr-10">
//           <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
//         </div>


//         <div>
//             <h1 className="font-medium mb-1">{displayName}</h1>
//             <p className="text-gray-600">{displayEmail}</p>
//           </div>


//         <div className="flex-1">
//           <div className="flex items-center mb-4">
//             <h2 className="text-xl font-normal mr-4">{username}</h2>
//             <button
//               className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium text-sm mr-2"
//               onClick={() => handleEdit()}
//             >
//               Edit profile
//             </button>
//             <button className="p-2 bg-gray-100 rounded-lg">
//               <Settings size={20} />
//             </button>
//           </div>

//           <div className="flex items-start space-x-10 mb-4">
//             <span><strong>Total Post:{posts.length}</strong> posts</span>
//             {/* <span><strong>0</strong> followers</span>
//             <span><strong>0</strong> following</span> */}
//           </div>

//           {/* <div>
//             <h1 className="font-medium mb-1">{displayName}</h1>
//             <p className="text-gray-600">{displayEmail}</p>
//           </div> */}
//         </div>
//       </div>

//       <div className="border-t border-gray-200">
//         <div className="flex justify-center space-x-16">
//           <button className="border-t border-black pt-4 text-sm font-medium flex items-center">
//             <Grid size={12} className="mr-2" />
//             POSTS
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-1 mt-4">
//         {posts.length > 0 ? (
//           [...posts].reverse().map((post) => (
//             <div
//               key={post._id}
//               className="w-full aspect-square overflow-hidden cursor-pointer"
//               onClick={() => {
//                 setSelectedPost(post);
//                 setCaption(
//                   typeof post.text === "string"
//                     ? post.text
//                     : typeof post.text === "object" && post.text !== null && post.text.content
//                     ? post.text.content
//                     : ""
//                 );
//                 setModalOpen(true);
//               }}
//             >
//               <img
//                 src={post.image || 'https://via.placeholder.com/300'}
//                 alt={typeof post.text === "string" ? post.text : "Post"}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))
//         ) : (
//           <div className="col-span-3 text-center text-gray-400">No posts yet.</div>
//         )}
//       </div>

//       {/* Modal */}
//       {modalOpen && selectedPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-0 max-w-lg w-full relative">
//             <button
//               className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
//               onClick={() => setModalOpen(false)}
//             >
//               &times;
//             </button>

//             <img
//               src={selectedPost.image || 'https://via.placeholder.com/600x400?text=No+Image'}
//               alt={
//                 typeof selectedPost.text === "string"
//                   ? selectedPost.text
//                   : "Post"
//               }
//               className="w-full h-80 object-cover rounded-t-lg"
//             />

//             <div className="p-4">
//               {/* Read-only textarea */}
//               <textarea
//                 className="w-full border rounded p-2 mb-3 resize-none cursor-not-allowed bg-gray-100"
//                 value={caption}
//                 readOnly
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={() => setModalOpen(false)}
//                   className="bg-gray-300 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedPost._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;













// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Settings } from 'react-feather';
// import { userApi, postApi } from '../services/Api';
// import { userContext } from '../components/layout/Context';

// const ProfilePage = () => {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [caption, setCaption] = useState('');

//   const { username, setUsername } = useContext(userContext);

//   const data = localStorage.getItem('userData');
//   const parsedData = data ? JSON.parse(data) : {};

//   useEffect(() => {
//     fetchUserProfile();
//     fetchMyPosts();
//     // eslint-disable-next-line
//   }, []);

//   const fetchMyPosts = async () => {
//     try {
//       const response = await postApi.getMyPosts();
//       if (response.data.success) {
//         setPosts(response.data.data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch posts:', err);
//     }
//   };

//   const fetchUserProfile = async () => {
//     try {
//       if (!parsedData._id) {
//         setError('User not found. Please log in again.');
//         setLoading(false);
//         return;
//       }
//       const response = await userApi.getProfile(parsedData["_id"]);
//       if (response.data.success) {
//         setProfile(response.data.data);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       console.error('Profile fetch error:', err);
//       setError('Failed to fetch profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await postApi.deletePost(id);
//       setPosts(posts.filter((p) => p._id !== id));
//       setModalOpen(false);
//     } catch (err) {
//       console.error("Failed to delete:", err);
//     }
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
//   }

//   const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";
//   const displayName = profile?.name || parsedData?.name || username || "Unknown User";
//   const displayEmail = profile?.email || parsedData?.email || "";

//   return (
//     <div className="max-w-5xl mx-auto pt-16 px-4">
//       <div className="flex items-start mb-8">
//         <div className="w-[150px] h-[150px] rounded-full overflow-hidden mr-10">
//           <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
//         </div>

//         <div>
//           <h1 className="text-xl font-semibold mb-1">{displayName}</h1>
//           <p className="text-gray-600 mb-2">{displayEmail}</p>
//           <p className="text-sm text-gray-700">
//             <strong>Total Posts:</strong> {posts.length}
//           </p>
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center mb-4">
//             <button
//               className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium text-sm mr-2"
//               onClick={() => navigate('/edit-profile')}
//             >
//               Edit profile
//             </button>
//             {/* <button className="p-2 bg-gray-100 rounded-lg">
//               <Settings size={20} />
//             </button> */}
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-200">
//         <div className="flex justify-center space-x-16">
//           <button className="border-t border-black pt-4 text-sm font-medium flex items-center">
//             <Grid size={12} className="mr-2" />
//             POSTS
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-1 mt-4">
//         {posts.length > 0 ? (
//           [...posts].reverse().map((post) => (
//             <div
//               key={post._id}
//               className="w-full aspect-square overflow-hidden cursor-pointer"
//               onClick={() => {
//                 setSelectedPost(post);
//                 setCaption(
//                   typeof post.text === "string"
//                     ? post.text
//                     : typeof post.text === "object" && post.text !== null && post.text.content
//                       ? post.text.content
//                       : ""
//                 );
//                 setModalOpen(true);
//               }}
//             >
//               <img
//                 src={post.image || 'https://via.placeholder.com/300'}
//                 alt={typeof post.text === "string" ? post.text : "Post"}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))
//         ) : (
//           <div className="col-span-3 text-center text-gray-400">No posts yet.</div>
//         )}
//       </div>

//       {modalOpen && selectedPost && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-0 max-w-lg w-full relative">
//             <button
//               className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
//               onClick={() => setModalOpen(false)}
//             >
//               &times;
//             </button>

//             <img
//               src={selectedPost.image || 'https://via.placeholder.com/600x400?text=No+Image'}
//               alt={
//                 typeof selectedPost.text === "string"
//                   ? selectedPost.text
//                   : "Post"
//               }
//               className="w-full h-80 object-cover rounded-t-lg"
//             />

//             <div className="p-4">
//               <textarea
//                 className="w-full border rounded p-2 mb-3 resize-none cursor-not-allowed bg-gray-100"
//                 value={caption}
//                 readOnly
//               />
//               <div className="flex justify-end space-x-2">
//                 <button
//                   onClick={() => setModalOpen(false)}
//                   className="bg-gray-300 px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleDelete(selectedPost._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


//with edit profile functionality


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from 'react-feather';
import { userApi, postApi } from '../services/Api';
import { userContext } from '../components/layout/Context';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState('');

  const { username, setUsername } = useContext(userContext);

  // 👇 State for edit name feature
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');

  const localData = localStorage.getItem('userData');
  const parsedData = localData ? JSON.parse(localData) : {};

  useEffect(() => {
    fetchUserProfile();
    fetchMyPosts();
    // eslint-disable-next-line
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await postApi.getMyPosts();
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      if (!parsedData._id) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }
      const response = await userApi.getProfile(parsedData._id);
      if (response.data.success) {
        setProfile(response.data.data);
        setNewName(response.data.data.name); // Set input field
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Name Update
  const handleUpdateName = async () => {
    try {
      const payload = {
        _id: parsedData._id,
        name: newName,
      };
      const response = await userApi.updateProfile(payload);

      if (response.data.success) {
        const updatedProfile = { ...profile, name: newName };
        setProfile(updatedProfile);
        setEditMode(false);

        // ✅ Update localStorage
        const updatedLocalData = { ...parsedData, name: newName };
        localStorage.setItem('userData', JSON.stringify(updatedLocalData));

        // ✅ Update context if needed
        if (setUsername) setUsername(newName);

        alert('Name updated successfully!');
      } else {
        alert('Failed to update name');
      }
    } catch (err) {
      console.error('Error updating name:', err);
      alert('An error occurred while updating name');
    }
  };

  const handleDelete = async (id) => {
    try {
      await postApi.deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";
  const displayName = profile?.name || parsedData?.name || username || "Unknown User";
  const displayEmail = profile?.email || parsedData?.email || "";

  return (
    <div className="max-w-5xl mx-auto pt-16 px-4">
      <div className="flex items-start mb-8">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden mr-10">
          <img src={imgSrc} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          {/* 👇 Editable Section */}
          {editMode ? (
            <div>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />
              <div className="space-x-2">
                <button
                  onClick={handleUpdateName}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setNewName(displayName);
                  }}
                  className="bg-gray-300 px-4 py-1.5 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold mb-1">{displayName}</h1>
              <p className="text-gray-600 mb-2">{displayEmail}</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Total Posts:</strong> {posts.length}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-1.5 bg-gray-100 rounded-lg font-medium text-sm"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6">
        <div className="flex justify-center space-x-16">
          <button className="border-t border-black pt-4 text-sm font-medium flex items-center">
            <Grid size={12} className="mr-2" />
            POSTS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-4">
        {posts.length > 0 ? (
          [...posts].reverse().map((post) => (
            <div
              key={post._id}
              className="w-full aspect-square overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedPost(post);
                setCaption(
                  typeof post.text === "string"
                    ? post.text
                    : typeof post.text === "object" && post.text?.content
                      ? post.text.content
                      : ""
                );
                setModalOpen(true);
              }}
            >
              <img
                src={post.image || 'https://via.placeholder.com/300'}
                alt={typeof post.text === "string" ? post.text : "Post"}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400">No posts yet.</div>
        )}
      </div>

      {/* Modal for Viewing Post */}
      {modalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-0 max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>

            <img
              src={selectedPost.image || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={selectedPost.text || 'Post'}
              className="w-full h-80 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <textarea
                className="w-full border rounded p-2 mb-3 resize-none cursor-not-allowed bg-gray-100"
                value={caption}
                readOnly
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button onClick={() => handleDelete(selectedPost._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
