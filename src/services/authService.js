import api from "../api/axios";
import { setTokens } from "../utils/tokenHelper";

const authService = {
    login: async (email, password) => {
        const response = await api.post("users/auth/login/", {
            email,
            password,
        });
        const { access, refresh } = response.data;
        setTokens(access, refresh);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get("users/profile/");
        return response.data;
    },

    logout: () => {
        localStorage.clear(); // Keeping it simple for now or use clearTokens
    }
};

export default authService;
