import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import Comment from "./Comment";
import timeAgo from "../utils/timeAgo";
import formatNumber from "../utils/formatNumber";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const VideoView = () => {
  const params = useParams();
  const video = params.id;
  const [videoData, setVideoData] = useState([]);
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [comment, setcomment] = useState("");
  const [commentTrigger, setCommentTrigger] = useState(false);
  const user = useSelector((store) => store.user.userDetails);
  const token = useSelector((store) => store.user.token);

  const handleLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      let uId = user._id;
      const { data } = await axios.put(
        `http://localhost:5000/api/video/likeVideo/${video}`,
        { uId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("video Liked");
        setVideoData((prev) => ({
          ...prev,
          likes: data.video.likes,
          dislikes: data.video.dislikes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleDisLike = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      let uId = user._id;
      const { data } = await axios.put(
        `http://localhost:5000/api/video/disLikeVideo/${video}`,
        { uId },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("video Disliked");
        setVideoData((prev) => ({
          ...prev,
          dislikes: data.video.dislikes,
          likes: data.video.likes,
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/video/${video}`
      );
      if (data) {
        setVideoData(data.video);
        fetchChannelData(data.video.channelId);
        fetchChannelVideos(data.video.channelId);
      }
      if (data?.video?.videoUrl) {
        setVideoUrl(data?.video?.videoUrl.match(/(?:v=|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] || "");
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (videoData) {
      fetchVideoComments();
    }
  }, [videoData, commentTrigger]);

  const fetchChannelVideos = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/video/channelVideos/${id}`
      );
      if (data) {
        setChannelVideos(data.videos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChannelData = async (cId) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/channel/${cId}`
    );
    if (data) {
      setChannelData(data.channel);
    }
  };

  const fetchVideoComments = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/comment/videoComments/${video}`
    );
    if (data) {
      setComments(data.comments);
    }
  };

  const triggerCommentFetch = () => {
    setCommentTrigger(!commentTrigger);
  };

  const handleComment = async () => {
    if (comment === "") {
      return toast.error("comment cannot be empty!");
    }
    if (!user || Object.keys(user).length < 1) {
      return toast.error("login required");
    }
    const commentData = {
      video: videoData?._id,
      owner: user?._id,
      description: comment,
    };
    try {
      const data = await axios.post(
        "http://localhost:5000/api/comment/addComment",
        commentData
      );
      if (data) {
        toast.success("comment added");
        fetchVideoComments();
        setcomment("");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    if (!user || Object.keys(user).length < 1) {
      return toast.error("Login first");
    }
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/channel/subscribeChannel/${channelData?._id}/${user?._id}`,
        {},
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      if (data) {
        toast.success("channel subscribed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3">
        <iframe
          className="w-full h-[50vh] sm:h-[60vh] md:h-[28rem] rounded-md"
          src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          rel="0"
          allowFullScreen
        ></iframe>
        <div className="operations flex flex-col sm:flex-row justify-between py-6 items-center">
          <div className="flex gap-4 w-full items-center">
            <Link
              to={`/channel/${channelData?._id}`}
              className="flex items-center gap-4"
            >
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={channelData?.channelLogo}
                alt="Channel name"
              />
              <h2 className="font-semibold text-xl">{channelData?.channelName}</h2>
            </Link>
            <button
              onClick={handleSubscribe}
              className="px-6 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
            >
              Subscribe
            </button>
          </div>
          <div className="flex text-sm gap-4 items-center sm:justify-end">
            <button
              onClick={handleLike}
              className="px-6 py-2 bg-gray-200 rounded-full flex items-center gap-2 hover:bg-gray-300 transition-all"
            >
              <BiLike size={20} />
              {videoData?.likes?.length}
            </button>
            <button
              onClick={handleDisLike}
              className="px-6 py-2 bg-gray-200 rounded-full flex items-center gap-2 hover:bg-gray-300 transition-all"
            >
              <BiDislike size={20}  />
              {videoData?.dislikes?.length}
            </button>
            <button className="px-6 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all">
              Save
            </button>
          </div>
        </div>

        <div className="video-details py-4">
          <div className="flex gap-4 text-sm">
            <h2>{formatNumber(videoData?.views)} Views •</h2>
            <h2>{timeAgo(videoData?.createdAt)}</h2>
          </div>
          <p className="text-lg mt-2">{videoData?.description}</p>
        </div>

        <div className="add-comment flex flex-col mt-6">
          <input
            type="text"
            name="comment"
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
            placeholder="Add a comment..."
            className="outline-none border-b-2 border-gray-400 p-2 text-lg mb-4"
          />
          <button
            onClick={handleComment}
            className="w-36 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
          >
            Post Comment
          </button>
        </div>

        <div className="comments mt-8">
          {comments?.length > 0
            ? comments?.map((item) => (
                <Comment
                  key={item._id}
                  triggerCommentFetch={triggerCommentFetch}
                  video={video}
                  id={item._id}
                  createdAt={item.createdAt}
                  owner={item.owner}
                  description={item.description}
                />
              ))
            : "No comments available."}
        </div>
      </div>

      <div className="related-videos md:w-1/3">
        <h2 className="text-xl py-6">More from this Channel</h2>
        <div className="flex flex-col gap-6">
          {channelVideos?.map((item) => (
            <Link
              key={item._id}
              to={`/video/${item._id}`}
              className="flex gap-4 p-4 shadow-md rounded-lg hover:shadow-lg transition-all"
            >
              <img
                className="w-24 h-16 rounded-md object-cover"
                src={item?.thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="video-details">
                <h3 className="text-sm sm:text-base font-semibold">
                  {item?.title.length > 50
                    ? item?.title.slice(0, 50) + "..."
                    : item?.title}
                </h3>
                <h4 className="text-sm text-gray-600">
                  {channelData?.channelName}
                </h4>
                <h5 className="text-sm text-gray-500">
                  {formatNumber(item?.views)} • {timeAgo(item?.createdAt)}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoView;
