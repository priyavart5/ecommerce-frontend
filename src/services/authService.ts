import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    name: string;
    email: string;
}

const registerUser = async (name: string, email: string, password: string) => {
    
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, { name, email, password });
        return response.data;
    } catch (error: any) {
        throw error.response || "Registration failed";
    }
    
};

const loginUser = async (email: string, password: string) => {
    
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error: any) {
        throw error.response || "Login failed";
    }
    
};


const getUserFromToken = (): DecodedToken | null => {

    const token = Cookies.get("token");
    if (!token) return null;
  
    try {
        const data = jwtDecode<DecodedToken>(token);
        return data;
    } catch (error) {
        console.log(error)
        return null;
    }
};
  

export { registerUser, loginUser, getUserFromToken };