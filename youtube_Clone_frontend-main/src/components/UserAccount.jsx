import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi"; // Icon for "Create Channel"

const UserAccount = () => {
  const userDetails = useSelector((store) => store.user.userDetails);
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length <= 0) {
      toast.error("Login required!");
      navigate("/");
    }
  }, [userDetails]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Account Details</h2>

      {/* User Info Card */}
      <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-gray-200 hover:bg-gray-50">
        <img
          src={userDetails?.avatar}
          className="w-40 h-40 rounded-full object-cover border-4 border-red-500 shadow-lg transition-transform transform hover:scale-105"
          alt="User Avatar"
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            Hello, {userDetails?.userName}
          </h3>
          <p className="text-lg text-gray-600 mb-2 leading-relaxed">
            <span className="font-semibold">Email:</span> {userDetails?.email}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-semibold">Account Created:</span> {userDetails?.createdAt?.split("T")[0]}
          </p>
        </div>
      </div>

      {/* Channels Section */}
      <h2 className="text-3xl font-semibold text-gray-800 mt-10 mb-6">
        Channel Details
      </h2>

      {/* Channel Card */}
      <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-gray-200 hover:bg-gray-50">
        {userChannel && Object.keys(userChannel).length >= 1 ? (
          <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200 hover:scale-105 transform transition duration-300 ease-in-out">
            <img
              src={userChannel?.channelLogo}
              className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-md transition-transform transform hover:scale-105"
              alt="Channel Logo"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-800">{userChannel?.channelName}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                  Active
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-md border border-gray-200">
            <p className="text-md text-gray-600 mb-4">
              You don't have any channel. You can create one!
            </p>
            <button
              onClick={() => navigate("/createChannel")}
              className="mt-4 px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-full flex items-center space-x-2 transition duration-300 ease-in-out"
            >
              <FiPlusCircle className="w-5 h-5" />
              <span className="font-semibold">Create Channel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
