import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// You can import the YouTube logo here or use the SVG inline
import { SiYoutube } from "react-icons/si";  // For YouTube logo icon

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userDetails);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [navigate, user]);

  // signup function to create a user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.userName ||
      !formData.avatar
    ) {
      toast.error("All fields are required!");
    }
    try {
      const { userName, email, password, avatar } = formData;
      let { data } = await axios.post(
        "https://youtube-clone-backend-ghq6.onrender.com/api/users/signup",
        {
          userName,
          email,
          password,
          avatar,
        }
      );
      if (data) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {/* YouTube Logo and Title */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <img src="/images/stream_view_logo.png" alt="logo" />
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
              id="userName"
              type="text"
              value={formData.userName}
              name="userName"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
              id="email"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
              id="password"
              type="password"
              value={formData.password}
              name="password"
              autoComplete="true"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Avatar Link
            </label>
            <input
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800"
              id="avatar"
              type="text"
              value={formData.avatar}
              name="avatar"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition-colors"
          >
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-800 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
