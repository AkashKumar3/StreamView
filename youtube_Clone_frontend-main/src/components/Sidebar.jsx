import { HiHome, HiTrendingUp, HiCollection, HiClock, HiMusicNote, HiPlay, HiBell, HiCog, HiQuestionMarkCircle, HiFilm, HiVideoCamera, HiBookOpen, HiThumbUp, HiShoppingBag, HiPuzzle, HiNewspaper, HiOutlineGlobe, HiOutlineBookOpen, HiMicrophone } from 'react-icons/hi';

import { Link } from "react-router-dom";

const Sidebar = ({ sideBarToggle }) => {
  const menuItems = [
    { icon: HiHome, text: 'Home', path: '/' },
    { icon: HiFilm, text: 'Shorts' },
    { icon: HiCollection, text: 'Subscriptions' },
  ];

  const staticItems = [
    { icon: HiClock, text: 'History' },
    { icon: HiPlay, text: 'Playlists' },
    { icon: HiVideoCamera, text: 'Your videos' },
    { icon: HiBookOpen, text: 'Your courses' },
    { icon: HiClock, text: 'Watch later' },
    { icon: HiThumbUp, text: 'Liked Videos' },
  ];

  const additionalItems = [
    { icon: HiTrendingUp, text: 'Trending' },
    { icon: HiShoppingBag, text: 'Shopping' },
    { icon: HiMusicNote, text: 'Music' },
    { icon: HiFilm, text: 'Movies' },
    { icon: HiPuzzle, text: 'Gaming' },
    { icon: HiNewspaper, text: 'News' },
    { icon: HiOutlineGlobe, text: 'Sports' },
    { icon: HiOutlineBookOpen, text: 'Courses' },
    { icon: HiCollection, text: 'Fashion & Beauty' },
    { icon: HiMicrophone, text: 'Podcast' },
    
    { icon: HiBell, text: 'Notifications' },
    { icon: HiCog, text: 'Settings' },
    { icon: HiQuestionMarkCircle, text: 'Help' },
  ];

  return (
    <div
      className={`h-[100%] hidden overflow-y-scroll py-4 w-72 pl-6 pr-4 ${
        sideBarToggle ? "hidden" : "sm:flex"
      } flex-col gap-2`}
    >
 {menuItems.map((item) => (
          item.path ? (
            <Link
              key={item.text}
              to={item.path}
              className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-6 h-6" />
              <span>{item.text}</span>
            </Link>
          ) : (
            <div
              key={item.text}
              className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-6 h-6" />
              <span>{item.text}</span>
            </div>
          )
        ))}
              {/* you section */}
              <span className='ml-4'>You</span>
        {staticItems.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <item.icon className="w-6 h-6" />
            <span>{item.text}</span>
          </div>
        ))}

        {/* Divider */}
        <hr className="my-2 border-gray-300" />
        
        <span className='ml-4'>Explore</span>
        {/* explore section */}
        {additionalItems.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <item.icon className="w-6 h-6" />
            <span>{item.text}</span>
          </div>
        ))}
  
    </div>
  );
};

export default Sidebar;
