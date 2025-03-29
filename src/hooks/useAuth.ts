import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(Cookies.get("token") || null);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { token };
};

export default useAuth;
