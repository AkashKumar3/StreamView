import { useState } from 'react';
import VideoCard from '../components/VideoCard';

const SAMPLE_VIDEOS = [
  {
    videoId: "video01",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:  "https://i.pinimg.com/originals/a1/56/ab/a156ab3553cf8b162a0f3393a4c26632.jpg",
    channelName: "Code with John",
    views: 15200,
    uploadDate: "3 days ago"
  },
];

const CATEGORIES = [
  "All", "Music", "Gaming", "Live", "React", "Programming", 
  "Comedy", "Education", "Sports", "Travel"
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="pt-14">
      {/* Categories Section */}
      <div className="bg-white border-b">
        <div className="flex gap-3 px-4 py-3 overflow-x-auto">
          {CATEGORIES.map(category => (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)} // Set the selected category without linking
              className={`px-4 py-1 rounded-full whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 mt-4">
        {SAMPLE_VIDEOS.map(video => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}
