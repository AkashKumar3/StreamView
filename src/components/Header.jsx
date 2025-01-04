import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiSearch } from 'react-icons/hi';
import { BsYoutube } from 'react-icons/bs';

export default function Header({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const isAuthenticated = false; // Will be managed by auth context later

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 flex items-center justify-between px-4 h-14 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-full">
          <HiMenu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <BsYoutube className="w-6 h-6 text-red-600" />
          <span className="text-base font-semibold sm:text-xl">YouTube</span>
        </Link>
      </div>

      <div className="flex-1 max-w-md sm:max-w-2xl mx-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
          />
          <button className="px-0 py-0 sm:px-6 ms:py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
            <HiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div>
        {isAuthenticated ? (
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        ) : (
          <Link
            to="/signin"
            className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}