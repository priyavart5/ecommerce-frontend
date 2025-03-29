"use client";

import React, { useState } from "react";
import style from "@/styles/authModal.module.css";
import { useDispatch } from "react-redux";
import { userDetails } from "@/redux/slices/authSlice";
import { loginUser, registerUser } from "@/services/authService";
import Cookies from "js-cookie";
import { X } from 'lucide-react';

interface authDetails{
    isOpen: boolean;
    onClose: ()=> void;
}

const AuthModal: React.FC<authDetails> = ({ isOpen, onClose }) => {

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const data = await loginUser(formData.email, formData.password);
        Cookies.set("token", data.token, { expires: 7 });
        dispatch(userDetails(data));
      } else {
        const data = await registerUser(formData.name, formData.email, formData.password);
        Cookies.set("token", data.token, { expires: 7 });
        dispatch(userDetails(data));
      }
      onClose();
    } catch (err: any) {
      setError(err.data.message as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className={style.authModal}>
        <div className={style.authModal_container}>

          <div className={style.top_authModal}>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <X onClick={onClose} style={{ "cursor":"pointer" }} color="#000" size={18} strokeWidth={2} />
          </div>

          {error && <p className="">{error}</p>}

          <form onSubmit={handleSubmit} className={style.form_authModal}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={style.input_authModal}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={style.input_authModal}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={style.input_authModal}
              required
            />

            <button
              type="submit"
              className={style.submit_authModal}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p
            className={style.alternate_authModal}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    )
  );
};

export default AuthModal;