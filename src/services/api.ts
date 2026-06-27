import axios from "axios";

const BASE_URL = "https://gorest.co.in/public/v2";

export const api = {
  getPosts: async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  },
  getCommentsByPost: async (postId: number) => {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return response.data;
  },
  // We need this because /posts only returns user_id, not the name/avatar
  getUserById: async (userId: number) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  },
};
