import axios from "axios";

class User {
  APP_URL = "http://127.0.0.1:8000/api";
  handleError(error) {
    if (error.response?.status === 422) {
      return {
        success: false,
        errors: error.response.data.errors || {},
      };
    }

    if (error.response?.status === 403) {
      return {
        success: false,
        message: error.response.data.error || "Action not allowed",
      };
    }

    return {
      success: false,
      message: "Something went wrong, please try again later",
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
      if (error.response.status === 403) {
        return { success: false, data: error.response.data };
      }
    }
  }

  async updateUserProfile({
    id,
    name,
    description,
    about,
    profile_img,
    removeImage,
  }) {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("name", name);
      if (description) formData.append("description", description);
      if (about) formData.append("about", about);
      if (profile_img) formData.append("profile_img", profile_img);
      if (removeImage) formData.append("removeImage", removeImage);

      const response = await axios.post(
        `${this.APP_URL}/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("userData", JSON.stringify(response.data.user));
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
      return { success: true, data: response.data.status };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getFollowers(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${this.APP_URL}/follower/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data.followers };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getFollowings(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${this.APP_URL}/followings/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { success: true, data: response.data.followings };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async toggleFollow(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${this.APP_URL}/follower/toggleFollow/${id}`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return { success: true, data: response.data.status };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async ChangeEmail(id, email, password) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${this.APP_URL}/settings/changeemail/${id}`,
        {
          email,
          password,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async ChangePassword(id, password, newPassword) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${this.APP_URL}/settings/changepassword/${id}?_method=PUT`,
        {
          password,
          newPassword,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async ChangeStatus(id, profile_status) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${this.APP_URL}/settings/changestatus/${id}?_method=PUT`,
        {
          profile_status,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return { success: true, data: response.message };
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const userObj = new User();
