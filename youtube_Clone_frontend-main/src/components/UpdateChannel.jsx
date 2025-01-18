import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserChannelDetails } from "../utils/userChannelSlice";
import { FaCameraRetro, FaCloudUploadAlt, FaEdit } from "react-icons/fa";

const UpdateChannel = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const user = useSelector((store) => store.user.userDetails);
  const jwtToken = useSelector((store) => store.user.token);

  const [formData, setFormData] = useState({
    channelLogo: "",
    channelName: "",
    description: "",
    channelBanner: "",
  });

  useEffect(() => {
    if (!userChannel && Object.keys(userChannel)?.length < 1) {
      navigate("/");
    } else {
      fetchChannelData();
    }
  }, [userChannel, navigate]);

  const fetchChannelData = async () => {
    const { data } = await axios.get(
      `https://youtube-clone-backend-ghq6.onrender.com/api/channel/${params.id}`
    );
    if (data) {
      setFormData({
        channelLogo: data?.channel?.channelLogo || "",
        channelName: data?.channel?.channelName || "",
        description: data?.channel?.description || "",
        channelBanner: data?.channel?.channelBanner || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(
        `https://youtube-clone-backend-ghq6.onrender.com/api/channel/updateChannel/${params.id}/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );
      if (result) {
        dispatch(setUserChannelDetails(result.data.channel));
        toast.success("Channel updated successfully!");
        navigate(`/channel/${userChannel._id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update channel.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-16 px-4">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-xl space-y-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Update Your Channel
        </h2>

        {/* Channel Logo */}
        <div className="relative mb-8">
          <div className="flex items-center space-x-3 border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <FaCameraRetro
              size={24}
              className={`transition-all duration-300 ${
                formData.channelLogo ? "text-blue-500" : "text-red-500"
              }`}
            />
            <input
              type="url"
              name="channelLogo"
              value={formData.channelLogo}
              onChange={handleChange}
              placeholder="Enter channel logo URL"
              id="channelLogo"
              className="w-full p-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Channel Name */}
        <div className="relative">
          <div className="flex items-center space-x-3 border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <FaEdit
              size={24}
              className={`transition-all duration-300 ${
                formData.channelName ? "text-blue-500" : "text-red-500"
              }`}
            />
            <input
              type="text"
              id="channelName"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              className="w-full p-2 text-gray-700 focus:outline-none"
              placeholder="Enter Channel Name"
            />
          </div>
        </div>

        {/* Channel Banner */}
        <div className="relative">
          <div className="flex items-center space-x-3 border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <FaCloudUploadAlt
              size={24}
              className={`transition-all duration-300 ${
                formData.channelBanner ? "text-blue-500" : "text-red-500"
              }`}
            />
            <input
              type="url"
              id="channelBanner"
              name="channelBanner"
              value={formData.channelBanner}
              onChange={handleChange}
              placeholder="Enter channel banner URL"
              className="w-full p-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Channel Description */}
        <div className="relative">
          <div className="flex items-center space-x-3 border border-gray-300 p-3 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <FaEdit
              size={24}
              className={`transition-all duration-300 ${
                formData.description ? "text-blue-500" : "text-red-500"
              }`}
            />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 text-gray-700 focus:outline-none"
              placeholder="Enter Channel Description"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-4 text-white bg-red-500 rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300"
          >
            Update Channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateChannel;
