import axios from "axios";
import { authservice } from "./Auth";

class Post {
  APP_URL = "http://127.0.0.1:8000/api";

  handleError(error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }

  async isAuthor({ id }) {
    try {
      const { success, user } = await authservice.getUser();
      if (!success || !user) return false;

      if (user.id === id) return true;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async listPosts(pageNumber = 1) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${this.APP_URL}/posts?page=${pageNumber}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserPosts(pageNumber = 1, id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${this.APP_URL}/posts/user/${id}?page=${pageNumber}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTagPosts(tag, pageNumber = 1) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${this.APP_URL}/posts/tag/${tag}?page=${pageNumber}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addPost({ title, body,tags, image }) {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("tags", tags);
      if (image) formData.append("image", image);

      const response = await axios.post(`${this.APP_URL}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updatePost({ id, title, body, image, tags, removeImage }) {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("tags", tags);
      if (image) formData.append("image", image);
      formData.append("removeImage", removeImage);
      const response = await axios.post(
        `${this.APP_URL}/posts/${id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deletePost({ id }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${this.APP_URL}/posts/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPost({ slug }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${this.APP_URL}/posts/${slug}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // searches
  async searchPost(query) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${this.APP_URL}/posts/${query}/search-result`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return { success: true, data: response.data.posts };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async liketoggle({ id }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${this.APP_URL}/post/${id}/toggle-like`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addComment({ post_id, body }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${this.APP_URL}/comments`,
        { post_id, body },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateComment({ id, body }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${this.APP_URL}/comments/${id}`,
        { body },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteComment(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${this.APP_URL}/comments/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async followStatus(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${this.APP_URL}/follower/status/${id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async toggleFollow({ id }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${this.APP_URL}/follower/toggleFollow/${id}`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // searches
  async searchPost(query) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${this.APP_URL}/posts/${query}/search-result`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return { success: true, data: response.data.posts };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const service = new Post();
