import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserState } from "../utils/userSlice";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );

  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let channelData = { ...formData, owner: user?._id };
    try {
      let result = await axios.post(
        "https://youtube-clone-backend-ghq6.onrender.com/api/channel/createChannel",
        channelData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        toast.success("Channel created successfully!");
        fetchCurrentUser();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/api/users/${user?._id}`
      );
      if (data) {
        dispatch(setUserState(data?.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to fetch user");
    }
  };

  useEffect(() => {
    if (userChannel && Object.keys(userChannel).length >= 1) {
      navigate("/");
    }
  }, [userChannel]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-16">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 w-full max-w-lg rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Create Your Channel</h2>

        {/* Channel Logo */}
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-red-500 object-cover mb-4"
            src={formData?.channelLogo || "https://us.123rf.com/450wm/asmati/asmati1610/asmati161000408/63831624-user-avatar-illustration-anonymous-sign-white-icon-on-red-circle.jpg?ver=6"}
            alt="Channel Logo"
          />
          <input
            type="url"
            name="channelLogo"
            value={formData.channelLogo}
            onChange={handleChange}
            required
            placeholder="Enter Logo URL"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Channel Name */}
        <div>
          <label className="text-gray-700 font-medium mb-2 block" htmlFor="channelName">
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            value={formData.channelName}
            onChange={handleChange}
            required
            placeholder="Enter Channel Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Channel Banner */}
        <div>
          <label className="text-gray-700 font-medium mb-2 block" htmlFor="channelBanner">
            Channel Banner
          </label>
          <input
            type="url"
            id="channelBanner"
            name="channelBanner"
            value={formData.channelBanner}
            onChange={handleChange}
            required
            placeholder="Enter Banner URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Channel Description */}
        <div>
          <label className="text-gray-700 font-medium mb-2 block" htmlFor="description">
            Channel Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter Channel Description"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 rounded-md transition duration-300 ease-in-out"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
