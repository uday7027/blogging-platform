import api from "./api.js";

export const getCommentsByPost = (postId) => {
  return api.get(`/comments/${id}`);
};

export const addComment = (postId, data) => {
  return api.post(`/comments/${postId}`, data);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
