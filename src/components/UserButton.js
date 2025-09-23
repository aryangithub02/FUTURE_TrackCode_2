import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const UserButton = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  if (!isLoaded) {
    return (
      <div className="w-10 h-10 rounded-full bg-dark-700 animate-pulse"></div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link 
          to="/login" 
          className="text-white hover:text-neon-blue transition-colors"
        >
          Login
        </Link>
        <span className="text-dark-400">|</span>
        <Link 
          to="/sign-up" 
          className="text-white hover:text-neon-blue transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue/30">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user.fullName || 'User'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-dark-700 flex items-center justify-center text-neon-blue">
              <FaUserCircle size={20} />
            </div>
          )}
        </div>
        <span className="hidden md:block text-white">
          {user.firstName || 'User'}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeDropdown}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-neon-blue/20 rounded-md shadow-lg overflow-hidden z-20">
            <div className="p-3 border-b border-neon-blue/10">
              <p className="text-white font-medium">{user.fullName || user.firstName || 'User'}</p>
              <p className="text-dark-300 text-sm truncate">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div className="py-1">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-dark-700 transition-colors"
                onClick={closeDropdown}
              >
                <FaUser size={14} className="text-neon-blue" />
                <span>My Profile</span>
              </Link>
              <button 
                onClick={() => {
                  signOut();
                  closeDropdown();
                }} 
                className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-dark-700 transition-colors"
              >
                <FaSignOutAlt size={14} className="text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserButton;