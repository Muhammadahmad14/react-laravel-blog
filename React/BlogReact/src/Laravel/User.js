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
}

export const user = new User();
