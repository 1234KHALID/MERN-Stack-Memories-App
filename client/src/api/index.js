import axios from 'axios';
const url = 'http://localhost:5000/posts';
const url1 = 'http://localhost:5000/user';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const SignUp = (formData) => axios.post(`${url1}/signup`, formData);


export const SignIn = (formData) => axios.post(`${url1}/signin`, formData);