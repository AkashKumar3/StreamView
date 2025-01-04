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
    // fetch channel data
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/channel/${channelId}`
      );
      if (data) {
        setChannelData(data.channel);
      }
    };
    fetchData();
  }, [channelId]);

  return (
    <div className="video_card w-96 sm:w-80 mlg:w-96 bg-white border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
      <Link to={`/video/${videoId}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-52 object-cover rounded-t-lg border-b transition-all duration-300 transform hover:scale-105"
        />
      </Link>
      <div className="flex items-center gap-3 p-3">
        <Link to={`/channel/${channelData?._id}`}>
          <img
            className="w-14 h-14 rounded-full border-2 border-gray-300 transition-transform duration-300 transform hover:scale-110"
            src={channelData.channelLogo}
            alt="Channel Logo"
          />
        </Link>
        <div className="description flex-1">
          <h2 className="text-lg font-semibold text-gray-900 truncate max-w-[90%]">{title}</h2>
          <div className="flex justify-between items-center text-gray-500 mt-2">
            <p className="text-sm">{channelData?.channelName}</p>
            <div className="flex gap-3 text-xs">
              <span>{formatNumber(views)} Views</span>
              <span>{timeAgo(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
