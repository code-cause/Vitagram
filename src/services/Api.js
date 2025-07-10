// baseUrl = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';

let hardToken = '01fe030b-3bc0-4165-bc6f-0eba7dcedb43'
console.log('line number 51',import.meta.env.VITE_API_BASE_URL)

export const instance = axios.create({
    baseURL:  import.meta.env.VITE_API_BASE_URL,
    headers:{
        'Content-Type': 'application/json'
        // ,'Authorization': 'Bearer ' + hardToken
    }
})

// interceptors:

instance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')

    if(token)   config.headers.Authorization = 'Bearer '+ token

    return config
})

// Auth endpoints
export const authApi = {
    signup: (userData) => instance.post('/auth/signup', userData),
    login: (credentials) => instance.post('/auth/login', credentials),
    logout: () => api.delete('/auth/logout'),
  }
  
  // Post endpoints
  export const postApi = {
    // uploadFile:()=> instance.post('/post/upload'),
    getMyPosts:()=>instance.get('/post/my-posts'),
    getFeed: () => instance.get('/post/feed'),
    getAllPosts: () => instance.get('/post/all-posts'),
    createPost: (postData) => instance.post('/post/create', postData),
    deletePost: (postId) => instance.delete(`/post/delete/${postId}`),
    likePost: (postId) => instance.post(`/post/like/${postId}`),
    unlikePost: (postId) => instance.post(`/post/unlike/${postId}`),
  }

// User endpoints
export const userApi = {
  getProfile: (id) => instance.get(`/user/profile/${id}`),
  updateProfile: (userData) => instance.put('/user/profile', userData)
}

//Comment endPoints

export const commentApi ={
  createComment: (postId)=> instance.put(`/comment/create/${postId}`),
  getComments: (postId)=>instance.get(`/comment/${postId}`),
  deleteComment: (commentId)=> instance.delete(`/comment/${commentId}`)
}
  
