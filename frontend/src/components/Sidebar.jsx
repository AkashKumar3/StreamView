import {
  HiHome, HiTrendingUp, HiCollection, HiClock, HiMusicNote, HiPlay,
  HiBell, HiCog, HiQuestionMarkCircle, HiFilm, HiVideoCamera, HiBookOpen,
  HiThumbUp, HiShoppingBag, HiPuzzle, HiNewspaper, HiOutlineGlobe,
  HiOutlineBookOpen, HiMicrophone
} from 'react-icons/hi';

import { Link } from "react-router-dom";

const Sidebar = ({ sideBarToggle }) => {
  const menuItems = [
    { icon: HiHome, text: 'Dashboard', path: '/' },
    { icon: HiFilm, text: 'Stream Shorts' },
    { icon: HiCollection, text: 'My Subscriptions' },
  ];

  const staticItems = [
    { icon: HiClock, text: 'Recently Watched' },
    { icon: HiPlay, text: 'Saved Playlists' },
    { icon: HiVideoCamera, text: 'My Uploads' },
    { icon: HiBookOpen, text: 'My Courses' },
    { icon: HiClock, text: 'Watch Later' },
    { icon: HiThumbUp, text: 'Liked Streams' },
  ];

  const additionalItems = [
    { icon: HiTrendingUp, text: 'Trending Now' },
    { icon: HiShoppingBag, text: 'Marketplace' },
    { icon: HiMusicNote, text: 'Music Room' },
    { icon: HiFilm, text: 'Movies & Shows' },
    { icon: HiPuzzle, text: 'Games' },
    { icon: HiNewspaper, text: 'News Feed' },
    { icon: HiOutlineGlobe, text: 'Live Sports' },
    { icon: HiOutlineBookOpen, text: 'Learning' },
    { icon: HiCollection, text: 'Style & Beauty' },
    { icon: HiMicrophone, text: 'Podcasts' },
    { icon: HiBell, text: 'Notifications' },
    { icon: HiCog, text: 'Preferences' },
    { icon: HiQuestionMarkCircle, text: 'Support' },
  ];

  return (
    <div
      className={`h-full hidden overflow-y-auto w-72 px-4 py-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl ${sideBarToggle ? "hidden" : "sm:flex"
        } flex-col gap-6`}
    >
      {/* Brand */}
      <div className="text-2xl font-bold mb-4 tracking-tight pl-2">StreamView</div>

      {/* Primary Navigation */}
      <div className="space-y-2">
        {menuItems.map((item) =>
          item.path ? (
            <Link
              key={item.text}
              to={item.path}
              className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.text}</span>
            </Link>
          ) : (
            <div
              key={item.text}
              className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.text}</span>
            </div>
          )
        )}
      </div>

      {/* You Section */}
      <div>
        <h4 className="text-xs uppercase text-gray-400 tracking-wide pl-2 mb-2">Your Library</h4>
        <div className="space-y-2">
          {staticItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-600 my-4" />

      {/* Explore Section */}
      <div>
        <h4 className="text-xs uppercase text-gray-400 tracking-wide pl-2 mb-2">Discover</h4>
        <div className="space-y-2">
          {additionalItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
