"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import AuthModal from "./AuthModal";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  console.log(user);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">E-Commerce</h1>

      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setAuthModalOpen(true)} className="bg-blue-600 px-4 py-1 rounded">
            Login / Register
          </button>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};