import axios from 'axios'; // use to communicate with other server 

const API = axios.create({ baseURL : "http://localhost:8000"  })

// for auth middleware to function by giving the token from front end to back end 
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

//api for post 
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPosts = (newPost) => API.post('/posts' , newPost); 
export const updatePost = (id , updatedPost) => API.patch(`/posts/${id}` , updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);  
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value , id) => API.post(`/posts/${id}/commentPost` , { value });

// api for authentication of the user 
export const signIn = (formData) => API.post('/user/signin' , formData);
export const signUp = (formData) => API.post('user/signup' , formData)