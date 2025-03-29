"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { logout, userDetails } from "@/redux/slices/authSlice";
import { getUserFromToken } from "@/services/authService";
import AuthModal from "./AuthModal";
import Image from "next/image";
import userImage from "../../public/userImage.png";
import style from "@/styles/navbar.module.css";
import { getCartItem } from "@/services/cartService";
import { setCart } from "@/redux/slices/cartSlice"; 
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); 
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const data = getUserFromToken();
    const token = Cookies.get("token");
    if (data && token) {
      dispatch(userDetails({ userId: data.id, userEmail: data.email, userName: data.name }));

      (async () => {
        try {
          const cart = await getCartItem(data.id, token);
          dispatch(setCart(cart));
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      })();
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className={style.navbar}>
        <h1>eComm.</h1>
        <div className={style.rest_navbar}>
          <button onClick={() => router.push("/cart") }>Cart - {cartItems.length}</button>
          {user.id && user.email && user.name ? (
            <>
              <span className={style.user_navabar}>
                <Image className={style.userImage_navabar} src={userImage} alt="userImage" />
                <p className={style.userName_navbar}>{user.name}</p>
              </span>
              <button onClick={handleLogout} className={style.loginlogout}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className={style.loginlogout}>
              Login
            </button>
          )}
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
