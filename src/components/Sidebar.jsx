import { HiHome, HiTrendingUp, HiCollection, HiClock, HiLibrary, HiMusicNote, HiPlay, HiBell, HiCog, HiQuestionMarkCircle, HiFilm, HiVideoCamera, HiBookOpen, HiThumbUp, HiShoppingBag, HiPuzzle, HiNewspaper, HiOutlineGlobe, HiOutlineBookOpen, HiMicrophone } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Sidebar({ isOpen }) {
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
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40 shadow-lg overflow-y-auto`}  // Make the sidebar scrollable
    >
      <nav className="p-2">
        {/*1st section */}
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

        {/* Divider */}
        <hr className="my-2 border-gray-300" />

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
      </nav>
    </aside>
  );
}
