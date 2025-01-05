import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import formatNumber from "../utils/formatNumber";
import timeAgo from "../utils/timeAgo";

const VideoCard = ({
  videoId,
  title,
  thumbnailUrl,
  channelId,
  views,
  createdAt,
}) => {
  const [channelData, setChannelData] = useState([]);
  
  useEffect(() => {
    // Fetch channel data
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/channel/${channelId}`
      );
      if (data) {
        setChannelData(data.channel);
      }
    };
    fetchData();
  }, [channelId]);

  return (
    <div className="video_card w-full sm:w-80 mlg:w-96 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/video/${videoId}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-52 sm:h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>
      <div className="p-4 flex items-center gap-4">
        <Link to={`/channel/${channelData?._id}`}>
          <img
            className="channel-logo w-14 h-14 rounded-full border-2 border-gray-300 transition-all duration-300 hover:border-gray-700"
            src={channelData.channelLogo}
            alt="Channel logo"
          />
        </Link>
        <div className="description flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-gray-700">{title}</h2>
          <Link
            to={`/channel/${channelData?._id}`}
            className="channel-name text-sm text-gray-600 hover:text-gray-800"
          >
            <p className="text-[14px]">{channelData?.channelName}</p>
          </Link>
          <div className="flex gap-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-600">{formatNumber(views)} Views</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">{timeAgo(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
