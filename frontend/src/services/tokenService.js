class TokenService {
  static async getToken() {
    const adminInfo = localStorage.getItem("adminInfo");

    if (!adminInfo) {
      console.error("No admin info found in localStorage");
      return null;
    }

    try {
      const adminInfoObject = JSON.parse(adminInfo);

      if (!adminInfoObject.token) {
        console.error("Token not found in admin info");
        return null;
      }

      return adminInfoObject.token;
    } catch (error) {
      console.error("Error parsing admin info from localStorage:", error);
      return null;
    }
  }
}

export default TokenService;
