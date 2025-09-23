import React from 'react';
import UserProfile from '../components/UserProfile';
import { useUser } from '@clerk/clerk-react';

const ProfilePage = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <section id="profile" className="min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          My Profile
        </h1>
        <UserProfile />
      </div>
    </section>
  );
};

export default ProfilePage;