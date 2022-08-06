import axios from "axios";
import queryString from "query-string";

const API = axios.create({ baseURL: "https://memoriesmernbg.herokuapp.com" });

// const url = "http://localhost:5000";

// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const updatePost = (id, updatePost) =>
//   axios.patch(`${url}/${id}`, updatePost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likepost`);

// export const signIn = (formData) => axios.post("/user/signin", formData);
// export const signUp = (formData) => axios.post(`${url}/user/signup`, formData);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

// export const signIn = (formData) => API.post("/user/signin", formData);
// export const signUp = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) =>
  API.post("/user/signin", queryString.stringify(formData));
export const signUp = (formData) =>
  API.post("/user/signup", queryString.stringify(formData));
