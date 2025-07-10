// like and comment


import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/layout/Navbar";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { postApi, commentApi } from "../services/Api";
import { userContext } from "../components/layout/Context";
import { useNavigate } from "react-router-dom";

const getUserData = () => {
  try {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error parsing user data:", error);
    return {};
  }
};

const HomePage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const navigate = useNavigate();
  const userData = getUserData();
  const { username } = useContext(userContext);

  const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signup");
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const res = await postApi.getFeed();
      if (res.data.success) setAllPosts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await commentApi.getComments(postId);
      if (res.data.success) {
        setComments((prev) => ({ ...prev, [postId]: res.data.data }));
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      if (likedPosts.includes(postId)) {
        await postApi.unlikePost(postId);
        setLikedPosts(likedPosts.filter((id) => id !== postId));
      } else {
        await postApi.likePost(postId);
        setLikedPosts([...likedPosts, postId]);
      }
      fetchAllPosts();
    } catch (err) {
      console.error("Like/Unlike failed:", err);
    }
  };

  const handleComment = async (postId) => {
    try {
      if (commentText.trim()) {
        await commentApi.createComment(postId, { text: commentText });
        setCommentText("");
        fetchComments(postId);
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const renderPostText = (post) => {
    const text = post.text;
    if (typeof text === "string") return text;
    if (typeof text === "object" && text !== null) {
      if (typeof text.content === "string") return text.content;
      return JSON.stringify(text);
    }
    return "";
  };

  const mockStories = allPosts
    .map((post) => ({
      id: post._id,
      username: post.user?.name || "Unknown",
      userImage:
        post.user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
    }))
    .slice(0, 10);

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,600px)_280px] max-w-screen-xl mx-auto px-4 py-6 gap-8">
        <div className="hidden md:block"></div>

        {/* Main Feed */}
        <div className="w-full space-y-6">
          {/* Stories */}
          <div className="bg-white border rounded-md shadow-sm p-4">
            <div className="flex overflow-x-auto gap-4 scrollbar-hide">
              {mockStories.map((story) => (
                <div key={story.id} className="flex flex-col items-center space-y-1">
                  <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-400">
                    <div className="bg-white rounded-full p-[1px]">
                      <img
                        src={story.userImage}
                        alt={story.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="text-xs truncate w-16 text-center">{story.username}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <div key={post._id} className="bg-white border rounded-lg shadow p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={imgSrc}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-semibold text-sm truncate">
                    {post.user?.name || "Unknown User"}
                  </p>
                </div>

                <img
                  src={post.image}
                  alt="post"
                  className="w-full max-h-[400px] object-cover rounded-md"
                />

                <div className="pt-3 space-y-1">
                  <div className="flex gap-4 text-gray-700">
                    <Heart
                      className={`cursor-pointer ${likedPosts.includes(post._id) ? "fill-red-500 text-red-500" : ""}`}
                      onClick={() => handleLike(post._id)}
                    />
                    <MessageCircle
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedPostId(post._id);
                        fetchComments(post._id);
                      }}
                    />
                    <Send className="cursor-pointer" />
                    <Bookmark className="ml-auto cursor-pointer" />
                  </div>
                  <p className="text-sm font-semibold">
                    {post.likesCount} likes
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold mr-1">
                      {post.user?.name || "Unknown"}
                    </span>
                    {renderPostText(post)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {post.timestamp || "1h ago"}
                  </p>
                </div>

                {selectedPostId === post._id && comments[post._id] && (
                  <div className="mt-2 space-y-1">
                    {comments[post._id].map((c) => (
                      <p key={c._id} className="text-sm">
                        <strong>{c.user.name}</strong>: {c.text}
                      </p>
                    ))}
                  </div>
                )}

                <div className="border-t pt-2 mt-2 flex items-center">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full text-sm focus:outline-none bg-transparent"
                    value={selectedPostId === post._id ? commentText : ""}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="text-blue-500 text-sm font-semibold"
                    onClick={() => handleComment(post._id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No posts yet.</p>
          )}
        </div>

        {/* Suggestions Panel */}
        <div className="hidden lg:block w-full max-w-[280px] space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={imgSrc}
                alt="user"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="truncate">
                <p className="font-semibold text-sm truncate">
                  {userData.name}
                </p>
                <p className="text-gray-500 text-xs truncate">
                  {userData.email}
                </p>
              </div>
            </div>
            <button className="text-blue-500 text-sm font-semibold">
              Switch
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-500">
                Suggestions for you
              </p>
              <button className="text-xs font-semibold">See All</button>
            </div>
            {[1, 2, 3].map((id) => (
              <div key={id} className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://randomuser.me/api/portraits/women/${20 + id}.jpg`}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="suggestion"
                  />
                  <div>
                    <p className="text-sm font-semibold">user_{id}</p>
                    <p className="text-xs text-gray-400">Suggested for you</p>
                  </div>
                </div>
                <button className="text-blue-500 text-xs font-semibold">
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-400 mt-6 leading-5">
            <p>About • Help • Press • API • Jobs • Privacy • Terms • Locations</p>
            <p className="mt-2">© 2025 Instagram Clone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;















// // import React, { useEffect, useState } from "react";
// // import Navbar from "../components/layout/Navbar";
// // import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
// // import { postApi } from "../services/Api";
// // import { useContext } from "react";
// // import  {userContext} from "../components/layout/Context"
// // import { useNavigate } from "react-router-dom";


// // const getUserData = () => {
// //   try {
// //     const data = localStorage.getItem("userData");
// //     return data ? JSON.parse(data) : {};
// //   } catch (error) {
// //     console.error("Error parsing user data:", error);
// //     return {};
// //   }
// // };

// // // const mockStories = Array.from({ length: 10 }, (_, i) => ({
// // //   id: i + 1,
// // //   username: `user${i + 1}`,
// // //   userImage: `https://randomuser.me/api/portraits/men/${i + 20}.jpg`,
// // // }));

// // const mockStories = allPosts
// //   .map((post) => ({
// //     id: post._id,
// //     username: post.user?.name || "Unknown",
// //     userImage: post.user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
// //   }))
// //   .slice(0, 10); // show only top 10


// // const HomePage = () => {
// //   const [allPosts, setAllPosts] = useState([]);
// //   const navigate = useNavigate();
// //   const userData = getUserData();
// //   const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";

// //   const {username} = useContext(userContext)

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) navigate("/signup");
// //     fetchAllPosts();
// //   }, []);

// //   const fetchAllPosts = async () => {
// //     try {
// //       const res = await postApi.getFeed();
// //       if (res.data.success) setAllPosts(res.data.data);
// //     } catch (err) {
// //       console.error("Failed to fetch posts:", err);
// //     }
// //   };

// //   const renderPostText = (post) => {
// //     if (typeof post.text === "string") return post.text;
// //     if (typeof post.text === "object" && post.text !== null) {
// //       if (post.text.content) return post.text.content;
// //       return JSON.stringify(post.text);
// //     }
// //     return "";
// //   };

// //   return (
// //     <div className="bg-gray-100 min-h-screen overflow-x-hidden">
// //       <Navbar />
// //       <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,600px)_280px] max-w-screen-xl mx-auto px-4 py-6 gap-8">
        
// //         {/* Left Spacer (for sidebar space) */}
// //         <div className="hidden md:block"></div>

// //         {/* Main Feed */}
// //         <div className="w-full space-y-6">

// //           {/* Stories */}
// //           <div className="bg-white border rounded-md shadow-sm p-4">
// //             <div className="flex overflow-x-auto gap-4 scrollbar-hide">
// //               {mockStories.map((story) => (
// //                 <div key={story.id} className="flex flex-col items-center space-y-1">
// //                   <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-400">
// //                     <div className="bg-white rounded-full p-[1px]">
// //                       <img
// //                         src={story.userImage}
// //                         alt={story.username}
// //                         className="w-full h-full rounded-full object-cover"
// //                       />
// //                     </div>
// //                   </div>
// //                   <span className="text-xs truncate w-16 text-center">{story.username}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Posts */}
// //           {allPosts.length > 0 ? (
// //             allPosts.map((post) => (
// //               <div key={post._id} className="bg-white border rounded-lg shadow p-4">
// //                 <div className="flex items-center gap-3 mb-2">
// //                   <img
// //                     src={imgSrc}
// //                     alt="user"
// //                     className="w-10 h-10 rounded-full object-cover"
// //                   />
// //                   <p className="font-semibold text-sm truncate">{post.user?.name || "Unknown User"}</p>
// //                 </div>

// //                 <img
// //                   src={post.image}
// //                   alt="post"
// //                   className="w-full max-h-[400px] object-cover rounded-md"
// //                 />

// //                 <div className="pt-3 space-y-1">
// //                   <div className="flex gap-4 text-gray-700">
// //                     <Heart className="cursor-pointer" />
// //                     <MessageCircle className="cursor-pointer" />
// //                     <Send className="cursor-pointer" />
// //                     <Bookmark className="ml-auto cursor-pointer" />
// //                   </div>
// //                   <p className="text-sm font-semibold">{post.likes} likes</p>
// //                   <p className="text-sm">
// //                     <span className="font-semibold mr-1">{post.user?.name || "Unknown"}</span>
// //                     {renderPostText(post)}
// //                   </p>
// //                   <p className="text-xs text-gray-400">{post.timestamp || "1h ago"}</p>
// //                 </div>

// //                 <div className="border-t pt-2 mt-2 flex items-center">
// //                   <input
// //                     type="text"
// //                     placeholder="Add a comment..."
// //                     className="w-full text-sm focus:outline-none bg-transparent"
// //                   />
// //                   <button className="text-blue-500 text-sm font-semibold">Post</button>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-center text-gray-500">No posts yet.</p>
// //           )}
// //         </div>

// //         {/* Right Suggestions Panel */}
// //         <div className="hidden lg:block w-full max-w-[280px] space-y-6 pt-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <img
// //                 src={imgSrc}
// //                 alt="user"
// //                 className="w-12 h-12 rounded-full object-cover"
// //               />
// //               <div className="truncate">
// //               {/* <p className="font-semibold text-sm truncate">{username}</p> */}
// //                 <p className="font-semibold text-sm truncate">{userData.name}</p>
// //                 <p className="text-gray-500 text-xs truncate">{userData.email}</p>
// //               </div>
// //             </div>
// //             <button className="text-blue-500 text-sm font-semibold">Switch</button>
// //           </div>

// //           <div>
// //             <div className="flex justify-between items-center mb-2">
// //               <p className="text-sm font-semibold text-gray-500">Suggestions for you</p>
// //               <button className="text-xs font-semibold">See All</button>
// //             </div>
// //             {[1, 2, 3].map((id) => (
// //               <div key={id} className="flex justify-between items-center mb-3">
// //                 <div className="flex items-center gap-3">
// //                   <img
// //                     src={`https://randomuser.me/api/portraits/women/${20 + id}.jpg`}
// //                     className="w-8 h-8 rounded-full object-cover"
// //                     alt="suggestion"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-semibold">user_{id}</p>
// //                     <p className="text-xs text-gray-400">Suggested for you</p>
// //                   </div>
// //                 </div>
// //                 <button className="text-blue-500 text-xs font-semibold">Follow</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="text-xs text-gray-400 mt-6 leading-5">
// //             <p>About • Help • Press • API • Jobs • Privacy • Terms • Locations</p>
// //             <p className="mt-2">© 2025 Instagram Clone</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;



// //yosh


// // // after like and comment



// // import React, { useEffect, useState, useContext } from "react";
// // import Navbar from "../components/layout/Navbar";
// // import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
// // import { postApi, commentApi } from "../services/Api";
// // import { userContext } from "../components/layout/Context";
// // import { useNavigate } from "react-router-dom";

// // const getUserData = () => {
// //   try {
// //     const data = localStorage.getItem("userData");
// //     return data ? JSON.parse(data) : {};
// //   } catch (error) {
// //     console.error("Error parsing user data:", error);
// //     return {};
// //   }
// // };

// // const mockStories = Array.from({ length: 10 }, (_, i) => ({
// //   id: i + 1,
// //   username: `user${i + 1}`,
// //   userImage: `https://randomuser.me/api/portraits/men/${i + 20}.jpg`,
// // }));

// // const HomePage = () => {
// //   const [allPosts, setAllPosts] = useState([]);
// //   const [likedPosts, setLikedPosts] = useState([]);
// //   const [comments, setComments] = useState({});
// //   const [commentText, setCommentText] = useState("");
// //   const [selectedPostId, setSelectedPostId] = useState(null);
// //   const navigate = useNavigate();
// //   const userData = getUserData();
// //   const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";
// //   const { username } = useContext(userContext);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) navigate("/signup");
// //     fetchAllPosts();
// //   }, []);

// //   const fetchAllPosts = async () => {
// //     try {
// //       const res = await postApi.getFeed();
// //       if (res.data.success) setAllPosts(res.data.data);
// //     } catch (err) {
// //       console.error("Failed to fetch posts:", err);
// //     }
// //   };

// //   const handleLike = async (postId) => {
// //     e.preventDefault()
// //     try {
// //       if (likedPosts.includes(postId)) {
// //         await postApi.unlikePost(postId);
// //         setLikedPosts(likedPosts.filter((id) => id !== postId));
// //       } else {
// //         await postApi.likePost(postId);
// //         setLikedPosts([...likedPosts, postId]);
// //       }
// //       fetchAllPosts();
// //     } catch (err) {
// //       console.error("Like/Unlike failed:", err);
// //     }
// //   };

// //   const handleComment = async (postId) => {
// //     try {
// //       if (commentText.trim()) {
// //         await commentApi.createComment(postId, { text: commentText });
// //         setCommentText("");
// //         fetchComments(postId);
// //       }
// //     } catch (err) {
// //       console.error("Failed to post comment:", err);
// //     }
// //   };

// //   const fetchComments = async (postId) => {
// //     try {
// //       const res = await commentApi.getComments(postId);
// //       if (res.data.success) {
// //         setComments((prev) => ({ ...prev, [postId]: res.data.data }));
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch comments:", err);
// //     }
// //   };

// //   const renderPostText = (post) => {
// //     if (typeof post.text === "string") return post.text;
// //     if (typeof post.text === "object" && post.text !== null) {
// //       if (post.text.content) return post.text.content;
// //       return JSON.stringify(post.text);
// //     }
// //     return "";
// //   };

// //   return (
// //     <div className="bg-gray-100 min-h-screen overflow-x-hidden">
// //       <Navbar />
// //       <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,600px)_280px] max-w-screen-xl mx-auto px-4 py-6 gap-8">
// //         <div className="hidden md:block"></div>

// //         <div className="w-full space-y-6">
// //           <div className="bg-white border rounded-md shadow-sm p-4">
// //             <div className="flex overflow-x-auto gap-4 scrollbar-hide">
// //               {mockStories.map((story) => (
// //                 <div key={story.id} className="flex flex-col items-center space-y-1">
// //                   <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-400">
// //                     <div className="bg-white rounded-full p-[1px]">
// //                       <img
// //                         src={story.userImage}
// //                         alt={story.username}
// //                         className="w-full h-full rounded-full object-cover"
// //                       />
// //                     </div>
// //                   </div>
// //                   <span className="text-xs truncate w-16 text-center">{story.username}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {allPosts.length > 0 ? (
// //             allPosts.map((post) => (
// //               <div key={post._id} className="bg-white border rounded-lg shadow p-4">
// //                 <div className="flex items-center gap-3 mb-2">
// //                   <img
// //                     src={imgSrc}
// //                     alt="user"
// //                     className="w-10 h-10 rounded-full object-cover"
// //                   />
// //                   <p className="font-semibold text-sm truncate">{post.user?.name || "Unknown User"}</p>
// //                 </div>

// //                 <img
// //                   src={post.image}
// //                   alt="post"
// //                   className="w-full max-h-[400px] object-cover rounded-md"
// //                 />

// //                 <div className="pt-3 space-y-1">
// //                   <div className="flex gap-4 text-gray-700">
// //                     <Heart
// //                       className={`cursor-pointer ${likedPosts.includes(post._id) ? "fill-red-500 text-red-500" : ""}`}
// //                       onClick={() => handleLike(post._id)}
// //                     />
// //                     <MessageCircle
// //                       className="cursor-pointer"
// //                       onClick={() => {
// //                         setSelectedPostId(post._id);
// //                         fetchComments(post._id);
// //                       }}
// //                     />
// //                     <Send className="cursor-pointer" />
// //                     <Bookmark className="ml-auto cursor-pointer" />
// //                   </div>
// //                   <p className="text-sm font-semibold">{post.likes} likes</p>
// //                   <p className="text-sm">
// //                     <span className="font-semibold mr-1">{post.user?.name || "Unknown"}</span>
// //                     {renderPostText(post)}
// //                   </p>
// //                   <p className="text-xs text-gray-400">{post.timestamp || "1h ago"}</p>
// //                 </div>

// //                 {selectedPostId === post._id && comments[post._id] && (
// //                   <div className="mt-2 space-y-1">
// //                     {comments[post._id].map((c) => (
// //                       <p key={c._id} className="text-sm"><strong>{c.user.name}</strong>: {c.text}</p>
// //                     ))}
// //                   </div>
// //                 )}

// //                 <div className="border-t pt-2 mt-2 flex items-center">
// //                   <input
// //                     type="text"
// //                     placeholder="Add a comment..."
// //                     className="w-full text-sm focus:outline-none bg-transparent"
// //                     value={selectedPostId === post._id ? commentText : ""}
// //                     onChange={(e) => setCommentText(e.target.value)}
// //                   />
// //                   <button
// //                     className="text-blue-500 text-sm font-semibold"
// //                     onClick={() => handleComment(post._id)}
// //                   >
// //                     Post
// //                   </button>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-center text-gray-500">No posts yet.</p>
// //           )}
// //         </div>

// //         <div className="hidden lg:block w-full max-w-[280px] space-y-6 pt-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <img
// //                 src={imgSrc}
// //                 alt="user"
// //                 className="w-12 h-12 rounded-full object-cover"
// //               />
// //               <div className="truncate">
// //                 <p className="font-semibold text-sm truncate">{userData.name}</p>
// //                 <p className="text-gray-500 text-xs truncate">{userData.email}</p>
// //               </div>
// //             </div>
// //             <button className="text-blue-500 text-sm font-semibold">Switch</button>
// //           </div>

// //           <div>
// //             <div className="flex justify-between items-center mb-2">
// //               <p className="text-sm font-semibold text-gray-500">Suggestions for you</p>
// //               <button className="text-xs font-semibold">See All</button>
// //             </div>
// //             {[1, 2, 3].map((id) => (
// //               <div key={id} className="flex justify-between items-center mb-3">
// //                 <div className="flex items-center gap-3">
// //                   <img
// //                     src={`https://randomuser.me/api/portraits/women/${20 + id}.jpg`}
// //                     className="w-8 h-8 rounded-full object-cover"
// //                     alt="suggestion"
// //                   />
// //                   <div>
// //                     <p className="text-sm font-semibold">user_{id}</p>
// //                     <p className="text-xs text-gray-400">Suggested for you</p>
// //                   </div>
// //                 </div>
// //                 <button className="text-blue-500 text-xs font-semibold">Follow</button>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="text-xs text-gray-400 mt-6 leading-5">
// //             <p>About • Help • Press • API • Jobs • Privacy • Terms • Locations</p>
// //             <p className="mt-2">© 2025 Instagram Clone</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;





// import React, { useEffect, useState, useContext } from "react";
// import Navbar from "../components/layout/Navbar";
// import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
// import { postApi } from "../services/Api";
// import { userContext } from "../components/layout/Context";
// import { useNavigate } from "react-router-dom";

// const getUserData = () => {
//   try {
//     const data = localStorage.getItem("userData");
//     return data ? JSON.parse(data) : {};
//   } catch (error) {
//     console.error("Error parsing user data:", error);
//     return {};
//   }
// };

// const HomePage = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const navigate = useNavigate();
//   const userData = getUserData();
//   const imgSrc = "https://randomuser.me/api/portraits/women/44.jpg";
//   const { username } = useContext(userContext);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) navigate("/signup");
//     fetchAllPosts();
//   }, []);

//   const fetchAllPosts = async () => {
//     try {
//       const res = await postApi.getFeed();
//       if (res.data.success) setAllPosts(res.data.data);
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//     }
//   };

//   const renderPostText = (post) => {
//     if (typeof post.text === "string") return post.text;
//     if (typeof post.text === "object" && post.text !== null) {
//       if (post.text.content) return post.text.content;
//       return JSON.stringify(post.text);
//     }
//     return "";
//   };

//   const mockStories = allPosts
//     .map((post) => ({
//       id: post._id,
//       username: post.user?.name || "Unknown",
//       userImage:
//         post.user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
//     }))
//     .slice(0, 10);

//   return (
//     <div className="bg-gray-100 min-h-screen overflow-x-hidden">
//       <Navbar />
//       <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,600px)_280px] max-w-screen-xl mx-auto px-4 py-6 gap-8">
//         {/* Left Spacer */}
//         <div className="hidden md:block"></div>

//         {/* Main Feed */}
//         <div className="w-full space-y-6">
//           {/* Stories */}
//           <div className="bg-white border rounded-md shadow-sm p-4">
//             <div className="flex overflow-x-auto gap-4 scrollbar-hide">
//               {mockStories.map((story) => (
//                 <div
//                   key={story.id}
//                   className="flex flex-col items-center space-y-1"
//                 >
//                   <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-400">
//                     <div className="bg-white rounded-full p-[1px]">
//                       <img
//                         src={story.userImage}
//                         alt={story.username}
//                         className="w-full h-full rounded-full object-cover"
//                       />
//                     </div>
//                   </div>
//                   <span className="text-xs truncate w-16 text-center">
//                     {story.username}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Posts */}
//           {allPosts.length > 0 ? (
//             allPosts.map((post) => (
//               <div
//                 key={post._id}
//                 className="bg-white border rounded-lg shadow p-4"
//               >
//                 <div className="flex items-center gap-3 mb-2">
//                   <img
//                     src={imgSrc}
//                     alt="user"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <p className="font-semibold text-sm truncate">
//                     {post.user?.name || "Unknown User"}
//                   </p>
//                 </div>

//                 <img
//                   src={post.image}
//                   alt="post"
//                   className="w-full max-h-[400px] object-cover rounded-md"
//                 />

//                 <div className="pt-3 space-y-1">
//                   <div className="flex gap-4 text-gray-700">
//                     <Heart className="cursor-pointer" />
//                     <MessageCircle className="cursor-pointer" />
//                     <Send className="cursor-pointer" />
//                     <Bookmark className="ml-auto cursor-pointer" />
//                   </div>
//                   <p className="text-sm font-semibold">{post.likes} likes</p>
//                   <p className="text-sm">
//                     <span className="font-semibold mr-1">
//                       {post.user?.name || "Unknown"}
//                     </span>
//                     {renderPostText(post)}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     {post.timestamp || "1h ago"}
//                   </p>
//                 </div>

//                 <div className="border-t pt-2 mt-2 flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Add a comment..."
//                     className="w-full text-sm focus:outline-none bg-transparent"
//                   />
//                   <button className="text-blue-500 text-sm font-semibold">
//                     Post
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No posts yet.</p>
//           )}
//         </div>

//         {/* Suggestions Panel */}
//         <div className="hidden lg:block w-full max-w-[280px] space-y-6 pt-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <img
//                 src={imgSrc}
//                 alt="user"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div className="truncate">
//                 <p className="font-semibold text-sm truncate">
//                   {userData.name}
//                 </p>
//                 <p className="text-gray-500 text-xs truncate">
//                   {userData.email}
//                 </p>
//               </div>
//             </div>
//             <button className="text-blue-500 text-sm font-semibold">
//               Switch
//             </button>
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-sm font-semibold text-gray-500">
//                 Suggestions for you
//               </p>
//               <button className="text-xs font-semibold">See All</button>
//             </div>
//             {[1, 2, 3].map((id) => (
//               <div
//                 key={id}
//                 className="flex justify-between items-center mb-3"
//               >
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={`https://randomuser.me/api/portraits/women/${
//                       20 + id
//                     }.jpg`}
//                     className="w-8 h-8 rounded-full object-cover"
//                     alt="suggestion"
//                   />
//                   <div>
//                     <p className="text-sm font-semibold">user_{id}</p>
//                     <p className="text-xs text-gray-400">Suggested for you</p>
//                   </div>
//                 </div>
//                 <button className="text-blue-500 text-xs font-semibold">
//                   Follow
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="text-xs text-gray-400 mt-6 leading-5">
//             <p>About • Help • Press • API • Jobs • Privacy • Terms • Locations</p>
//             <p className="mt-2">© 2025 Instagram Clone</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
