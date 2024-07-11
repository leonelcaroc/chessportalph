import { adminApi } from "./api";

class AdminService {
  static async createAdmin(payload) {
    try {
      const response = await adminApi.post("/register", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }

  static async getAdmins() {
    try {
      const response = await adminApi.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching admins:", error);
      throw error;
    }
  }

  static async getPlayers(search, page, limit) {
    try {
      const response = await adminApi.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  }

  static async loginAdmin(payload) {
    try {
      const response = await adminApi.post("/auth", payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in admin:", error);
      throw error;
    }
  }

  static async getAdminById(id) {
    try {
      const response = await adminApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching admin:", error);
      throw error;
    }
  }

  static async updateAdmin(id, updatedAdmin) {
    try {
      const response = await adminApi.put(`/${id}`, updatedAdmin);
      return response.data;
    } catch (error) {
      console.error("Error updating admin:", error);
      throw error;
    }
  }

  static async deleteAdmin(id) {
    try {
      const response = await adminApi.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting admin:", error);
      throw error;
    }
  }
}

export default AdminService;
