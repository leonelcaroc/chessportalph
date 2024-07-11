import { create } from "zustand";

const useAdminStore = create((set) => ({
  adminData: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
  setCredentials: (data) => {
    localStorage.setItem("adminInfo", JSON.stringify(data));
  },
  logout: () => {
    localStorage.removeItem("adminInfo");
  },
}));

export default useAdminStore;
