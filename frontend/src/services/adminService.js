import api from "./api";

export const getDashboardStats = () => {
  return api.get("/admin/stats");
};

export const getAllUsers = () => {
  return api.get("/admin/users");
};

export const deleteUserByAdmin = (id) => {
  return api.delete(`/admin/users/${id}`);
};

export const getAllPostsAdmin = () => {
  return api.get("/admin/posts");
};

export const deletePostByAdmin = (id) => {
  return api.delete(`/admin/posts/${id}`);
};
