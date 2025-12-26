import axios from "axios";

class User {
  APP_URL = "http://127.0.0.1:8000/api";
  handleError(error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }

  async getSearchedUser(query) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${this.APP_URL}/users/${query}/search-result`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return { success: true, data: response.data.users };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserProfile(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${this.APP_URL}/profile/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUserProfile({ id, name, description,about, profile_img, removeImage }) {
    try {
      const token = localStorage.getItem("token");

      
      const formData = new FormData();
      formData.append("_method", "PATCH"); // 🔥 required for Laravel
      formData.append("name", name);
      if (description) formData.append("description", description);
      if (about) formData.append("about", about);
      if (profile_img) formData.append("profile_img", profile_img);
      if (removeImage) formData.append("removeImage", removeImage);

      const response = await axios.post(
        `${this.APP_URL}/profile/${id}`, // use POST instead of PATCH
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // remove Content-Type, axios sets it automatically
          },
        }
      );

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
}

export const userObj = new User();
