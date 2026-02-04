import api from "api";

export const getAllPost = (params) => {
  return api.get("/posts", { params });
};

export const getSinglePost = (id) => {
  return api.get(`/posts/${id}`);
};

export const createPost = (data) => {
  return api.post("/posts", data);
};

export const updatePost = (id, data) => {
  return api.put(`/posts/${id}`, data);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export const toggleLike = (id) => {
  return api.put(`/posts/${id}/like`);
};
