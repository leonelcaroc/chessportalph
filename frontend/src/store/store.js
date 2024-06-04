import { create } from "zustand";
import AdminService from "../services/adminService";

const useAdminStore = create((set) => ({
  adminData: localStorage.getItem("adminData")
    ? JSON.parse(localStorage.getItem("adminData"))
    : null,
  login: async (username, password) => {
    try {
      const adminData = await AdminService.loginAdmin({ username, password });
      set({ adminData });
      localStorage.setItem("adminData", JSON.stringify(adminData));
      return adminData;
    } catch (error) {
      console.error("Error logging in admin:", error);
      throw error;
    }
  },
  logout: () => {
    set({ adminData: null });
    localStorage.removeItem("adminData");
  },
}));

export default useAdminStore;
