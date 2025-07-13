import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SearchVideoView from "./SearchVideoView";

const SearchVideos = () => {
  const [searchVideos, setSearchvideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    // Fetch videos based on the search term
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://youtube-clone-backend-ghq6.onrender.com/api/video/search/${params.searchItem}`
        );
        if (data) {
          setSearchvideos(data.videos);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [params]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-gray-800 mb-2">
          Search Results for: <span className="text-gray-600">"{params.searchItem}"</span>
        </h2>
        <p className="text-lg text-gray-500">
          {loading ? (
            <span>Loading...</span>
          ) : (
            `${searchVideos.length} video${searchVideos.length !== 1 ? "s" : ""} found`
          )}
        </p>
      </div>

      {/* Search Results List */}
      <div className="space-y-8">
        {searchVideos && searchVideos.length >= 1 ? (
          searchVideos.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <SearchVideoView item={item} />
            </div>
          ))
        ) : (
          <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="font-serif text-2xl text-gray-600">No videos matched your search</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchVideos;
