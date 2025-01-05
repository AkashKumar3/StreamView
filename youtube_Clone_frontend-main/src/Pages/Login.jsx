import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken, setUserState } from "../utils/userSlice";
import { SiYoutube } from "react-icons/si"; // YouTube logo from react-icons

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [navigate, user]);

  // login function
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required!");
    }
    try {
      const { email, password } = formData;
      let { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      if (data) {
        toast.success(data.message);
        dispatch(setUserState(data.user));
        dispatch(setToken(data.jwtToken));
        navigate("/"); // Redirect to the home page after successful login
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // onchange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        {/* YouTube Logo and Title */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <SiYoutube size={40} className="text-red-600" />
          <h2 className="text-3xl font-semibold text-gray-800">YouTube</h2>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
              id="email"
              type="email"
              required
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
              id="password"
              type="password"
              value={formData.password}
              required
              name="password"
              autoComplete="true"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-all"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/signUp" className="font-semibold text-red-600 hover:underline">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
