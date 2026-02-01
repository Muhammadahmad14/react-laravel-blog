import axios from "axios";

class Subscription {
  APP_URL = "http://127.0.0.1:8000/api";

  async createSubscription(plan) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${this.APP_URL}/subscribe`,
        { plan },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return { success: true, data: response.data.url };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

export const subscription = new Subscription();
