import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import backgroundImg from "../../assets/Login/login.svg";
import { login } from "../../network/auth.js";
import { setCredentials, setLoading, setError } from "../../store/authSlice";

const roletypes = {
  buyer: "buyer",
  broker: "broker",
  admin: "admin"
};

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await login({
        email: email,
        password: password
      });
      const userData = response?.data;
      const userRole = userData?.data?.user.role;
      const token = userData?.data?.token;

      if (userRole === roletypes.admin) {
        // Update Redux store with new user data
        dispatch(setCredentials({
          user: {
            ...userData.data.user,
            role: userRole
          },
          token: token
        }));
        
        navigate('/home');
      } else {
        const errorMessage = "Access denied. Admin privileges required.";
        dispatch(setError(errorMessage));
        setErrMessage(errorMessage);
      }
    } catch (_err) {
      const errorMessage = "Invalid email or password. Please try again.";
      dispatch(setError(errorMessage));
      setErrMessage(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }

    //localStorage.setItem("user", JSON.stringify({ email }));
  };
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-[#002349] p-8 rounded-xl shadow-xl w-full max-w-sm text-white">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-2">Sign in</h2>
        <p className="text-sm mb-6">Welcome Back Admin</p>

        {/* Error Message */}
        {errMessage && <p className="text-yellow-400 font-medium mb-4">{errMessage}</p>}

        {/* Sub-header */}
        <p className="font-semibold mb-4">Sign In with email address</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 text-sm">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="
              w-full 
              bg-transparent 
              border-b-2 border-white 
              placeholder-white/70 
              text-white 
              focus:outline-none 
              mb-6
            "
          />

          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="
              w-full 
              bg-transparent 
              border-b-2 border-white 
              placeholder-white/70 
              text-white 
              focus:outline-none 
              mb-6
            "
          />

          <div className="flex justify-end mb-4 text-sm">
            <Link
              to="/forgot-password"
              className="underline hover:text-gray-300"
            >
              Forget Password?
            </Link>
          </div>

          <p className="text-xs text-white/70 mb-6">
            By submitting this form, you acknowledge that you accept our{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="underline">
              Terms of Use
            </Link>
            .
          </p>

          <button
            type="submit"
            className="
              w-full py-3 
              bg-white text-blue-900 font-semibold 
              rounded hover:bg-gray-100 transition
            "
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
