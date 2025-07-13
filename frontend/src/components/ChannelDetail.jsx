import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelVideo from "./ChannelVideo";

const ChannelDetail = () => {
  const params = useParams();
  const [channelData, setChannelData] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const user = useSelector((store) => store.user.userDetails);
  const [triggerVideoFetch, setTriggerVideoFetch] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // function to fetch data of channel with id
    const fetchChannelData = async () => {
      try {
        const { data } = await axios.get(
          `https://streamview-zrby.onrender.com/api/channel/${params.id}`
        );
        if (data) {
          setChannelData(data.channel);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannelData();
  }, [params]);

  useEffect(() => {
    if (channelData) {
      fetchVideos(channelData?._id);
    }
  }, [channelData, triggerVideoFetch]);

  // trigger function to rerender the component
  const triggerVideoFetching = () => {
    setTriggerVideoFetch(!triggerVideoFetch);
  };

  // function to fetch videos
  const fetchVideos = async (channelId) => {
    setloading(true);
    try {
      const { data } = await axios.get(
        `https://streamview-zrby.onrender.com/api/video/channelVideos/${channelId}`
      );

      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <h3>...Loading</h3>
      ) : (
        <div className="md:px-24">
          <div>
            {channelData && Object.keys(channelData).length >= 1 ? (
              <div>
                {/* Updated Banner Section */}
                <div className="relative w-full h-60 sm:h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={channelData?.channelBanner}
                    className="w-full h-full object-cover"
                    alt="channelBanner"
                  />
                  {/* Banner Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32"></div>
                </div>

                {/* Channel Details */}
                <div className="channelDetails flex flex-col sm:flex-row items-center sm:gap-8 py-4 sm:py-6 mt-4">
                  <img
                    src={channelData?.channelLogo}
                    className="rounded-full border-8 border-white w-32 h-32 sm:w-40 sm:h-40 shadow-xl mb-4 sm:mb-0"
                    alt="channellogo"
                  />
                  <div className="details text-center sm:text-left">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      {channelData?.channelName}
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                      <strong>Videos:</strong> {channelData?.videos?.length}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      <strong>Subscribers:</strong> {channelData?.subscribers?.length}
                    </p>
                    <p className="text-lg text-gray-600 mb-2">
                      <strong>Created At:</strong> {channelData?.createdAt?.split("T")[0]}
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                      {channelData?.description?.length >= 330
                        ? channelData?.description.slice(0, 330) + "..."
                        : channelData?.description}
                    </p>
                  </div>
                </div>

                {/* Channel Owner Options */}
                <div className="flex justify-center sm:justify-start">
                  {channelData?.owner === user?._id ? (
                    <>
                      <Link
                        to="/uploadVideo"
                        className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition duration-300 mr-4"
                      >
                        Upload Video
                      </Link>
                      <Link
                        to={`/updateChannel/${channelData?._id}`}
                        className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition duration-300"
                      >
                        Edit Channel
                      </Link>
                    </>
                  ) : (
                    <h2 className="text-lg font-semibold">Videos</h2>
                  )}
                </div>
              </div>
            ) : (
              <h2>No Channel Found</h2>
            )}

            {/* Display Video Grid Below */}
            <div className="flex flex-wrap gap-8 mt-10">
              {channelVideos && channelVideos.length >= 1 ? (
                channelVideos.map((item) => (
                  <ChannelVideo
                    triggerVideoFetching={triggerVideoFetching}
                    channelData={channelData}
                    key={item._id}
                    item={item}
                  />
                ))
              ) : (
                <h2>No videos to display</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelDetail;
