import axios from "axios";

class AuthService {
  APP_URL = "http://127.0.0.1:8000/api";

  // REGISTER
  async register({ name, email, password }) {
    try {
      const response = await axios.post(`${this.APP_URL}/register`, {
        name,
        email,
        password,
      });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
      };
    }
  }

  // LOGIN
  async login({ email, password }) {
    try {
      const response = await axios.post(`${this.APP_URL}/login`, {
        email,
        password,
      });

      if (response.data.access_token) {
        // Save token + role to localStorage
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
      }

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
      };
    }
  }

  // GET USER
  async getUser() {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        return { success: true, user: JSON.parse(userData) };
      }

      const token = localStorage.getItem("token");
      if (!token) return { success: false, error: "No token found" };

      const response = await axios.get(`${this.APP_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { success: true, user: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
      };
    }
  }

  // LOGOUT
  async logout() {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${this.APP_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userData");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Something went wrong",
      };
    }
  }

  // CHECK IF ADMIN OR USER
  getRole() {
    return localStorage.getItem("role");
  }

  // CHECK IF LOGGED IN
  isLoggedIn() {
    return localStorage.getItem("token");
  }

  async sendOtp(email) {
    try {
      const response = await axios.post(
        `${this.APP_URL}/forget-password/send-otp`,
        { email },
      );
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Something went wrong",
      };
    }
  }

  async verifyOtp(otp) {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `${this.APP_URL}/forget-password/verify-otp`,
        {email, otp },
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "OTP verification failed",
      };
    }
  }

  async resetPassword(password, password_confirmation) {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(
        `${this.APP_URL}/forget-password/reset`,
        {
          email,
          password,
          password_confirmation,
        },
      );

      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Password reset failed",
      };
    }
  }
}

export const authservice = new AuthService();
