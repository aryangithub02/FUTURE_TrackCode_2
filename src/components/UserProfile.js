import React from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaIdCard, FaSignOutAlt, FaShoppingBag, FaHeart, FaAddressCard } from 'react-icons/fa';

const UserProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse bg-dark-700 rounded-lg p-8 w-full max-w-md">
          <div className="h-20 bg-dark-600 rounded-full w-20 mb-4 mx-auto"></div>
          <div className="h-4 bg-dark-600 rounded w-3/4 mb-4 mx-auto"></div>
          <div className="h-4 bg-dark-600 rounded w-1/2 mb-8 mx-auto"></div>
          <div className="h-10 bg-dark-600 rounded w-full mb-4"></div>
          <div className="h-10 bg-dark-600 rounded w-full mb-4"></div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">You're not signed in</h2>
          <p className="text-dark-200">Sign in to view your profile and manage your account</p>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="bg-neon-blue hover:bg-neon-blue/80 text-white px-6 py-2 rounded-full transition-all">
            Sign In
          </Link>
          <Link to="/sign-up" className="border border-neon-blue text-neon-blue hover:bg-neon-blue/10 px-6 py-2 rounded-full transition-all">
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-8">
      <div className="bg-dark-800 border border-neon-blue/20 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="p-6 bg-dark-900 border-b border-neon-blue/10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neon-blue/30 flex-shrink-0">
            <img 
              src={user.imageUrl || 'https://via.placeholder.com/100'} 
              alt={user.fullName || 'User'} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              {user.fullName || 'User'}
            </h1>
            <p className="text-dark-200 mb-2">{user.primaryEmailAddress?.emailAddress}</p>
            <p className="text-xs text-dark-300">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-dark-900/50 p-4 rounded-lg border border-neon-blue/10 hover:border-neon-blue/30 transition-all">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaUser className="text-neon-blue" /> Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaIdCard className="text-dark-300" />
                  <span className="text-dark-200">ID:</span>
                  <span className="text-white">{user.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-dark-300" />
                  <span className="text-dark-200">Email:</span>
                  <span className="text-white">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-dark-900/50 p-4 rounded-lg border border-neon-blue/10 hover:border-neon-blue/30 transition-all">
              <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
              <div className="space-y-3">
                <Link to="/orders" className="flex items-center gap-2 text-dark-100 hover:text-neon-blue transition-all">
                  <FaShoppingBag /> My Orders
                </Link>
                <Link to="/wishlist" className="flex items-center gap-2 text-dark-100 hover:text-neon-blue transition-all">
                  <FaHeart /> Wishlist
                </Link>
                <Link to="/addresses" className="flex items-center gap-2 text-dark-100 hover:text-neon-blue transition-all">
                  <FaAddressCard /> Manage Addresses
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-all"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;