import axios from 'axios';  // we use it to make api calls.

const API = axios.create({ baseURL:'http://localhost:5000' });

const url = 'http://localhost:5000/posts';
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page)=> API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => 
    API.get(`/posts/search?searchQuery=${searchQuery.search || ''}&tags=${searchQuery.tags}`);
  
export const createPost = (newPost)=> API.post('/posts',newPost); 

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (FormData) => API.post('/user/signin', FormData);
export const signUp = (FormData) => API.post('/user/signup', FormData);

