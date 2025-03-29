import axios from "axios";

const registerUser = async (name: string, email: string, password: string) => {

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, { name, email, password });
        return response.data;
    } catch (error) {
        throw error || "Registration failed";
    }

};

const loginUser = async (email: string, password: string) => {

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error || "Login failed";
    }

};

export { registerUser, loginUser };