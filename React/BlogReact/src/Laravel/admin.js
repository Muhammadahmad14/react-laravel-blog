import axios from "axios";

const APP_URL = import.meta.env.VITE_APP_URL;

class Admin {
  async dashboard() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${APP_URL}/admin/dashboard`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return { success: true, data: response.data.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async getPosts(page = 1, status = "", search = "", tag = "", user_id) {
    const token = localStorage.getItem("token");

    let url = `${APP_URL}/admin/posts?page=${page}`;
    if (status) {
      url += `&status=${status}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (user_id) {
      url += `&user_id=${user_id}`;
    }
    try {
      const response = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return { success: true, data: response.data.posts };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }
  async addPost({ title, body, tags, image }) {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("tags", tags);
      if (image) formData.append("image", image);

      const response = await axios.post(`${APP_URL}/admin/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async updatePost({ id, title, body, status, image, tags, removeImage }) {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("status", status);
      formData.append("tags", tags);
      if (image) formData.append("image", image);
      formData.append("removeImage", removeImage);
      const response = await axios.post(
        `${APP_URL}/admin/posts/${id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }
  async getPost({ slug }) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${APP_URL}/admin/posts/${slug}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async deletePost(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${APP_URL}/admin/posts/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async getUsers(page = 1, status = "", search = "", postId, commentId) {
    const token = localStorage.getItem("token");

    let url = `${APP_URL}/admin/users?page=${page}`;
    if (status) {
      url += `&status=${status}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    if (postId) {
      url += `&post_id=${postId}`;
    }
    if (commentId) {
      url += `&comment_id=${commentId}`;
    }

    try {
      const response = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return { success: true, data: response.data.users };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async updateUserStatus(id, newstatus) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${APP_URL}/admin/users/${id}/status`,
        { status: newstatus },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async updateUserRole(userId, role) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${APP_URL}/admin/users/${userId}/role`,
        { role },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async getTags(page = 1, search = "") {
    const token = localStorage.getItem("token");

    let url = `${APP_URL}/admin/tags?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    try {
      const response = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return { success: true, data: response.data.tags };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async getTag(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${APP_URL}/admin/tags/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data.tag };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async addTag(tag) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${APP_URL}/admin/tags`,
        { tags: [tag] },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async updateTag(id, tag) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${APP_URL}/admin/tags/${id}`,
        { tag },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async deleteTag(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${APP_URL}/admin/tags/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // comments
  async getComments(page = 1, id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${APP_URL}/admin/comments/${id}?page=${page}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data.comments };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async updateCommentStatus(status, id) {
    try {
      const token = localStorage.getItem("token");
      const response = axios.put(
        `${APP_URL}/admin/comments/${id}`,
        { status },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async deleteComment(id) {
    try {
      const token = localStorage.getItem("token");
      const response = axios.delete(`${APP_URL}/admin/comments/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  async changePassword(current_password, new_password) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${APP_URL}/admin/settings/change-password`,
        {
          current_password,
          new_password,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      return { success: true, data: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.errors };
    }
  }
}
export const admin = new Admin();
