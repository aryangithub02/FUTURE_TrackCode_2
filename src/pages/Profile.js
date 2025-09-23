// Profile.js
import React, { useState } from "react";
import { useUser, UserProfile, UserButton } from "@clerk/clerk-react";

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [name, setName] = useState(user?.fullName || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!isSignedIn) {
    return (
      <p className="text-center mt-10 text-red-500">
        You need to log in to view your profile.
      </p>
    );
  }

  const handleNameUpdate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await user.update({ fullName: name.trim() });
      setEditing(false);
    } catch (err) {
      console.error("Error updating name:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full overflow-x-auto">
      <div className="min-w-[320px] container mx-auto p-4 sm:p-6 lg:p-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-full mx-auto">
          
          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full shadow-md object-cover"
            />
            <div className="text-center sm:text-left">
              {/* Editable Name */}
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-lg sm:text-xl lg:text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleNameUpdate}
                    disabled={loading}
                    className="bg-primary-500 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-600 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setEditing(false); setName(user.fullName); }}
                    className="text-gray-500 px-2 py-1 text-sm hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 flex items-center gap-2">
                  {user.fullName || "No Name"}
                  <button
                    onClick={() => setEditing(true)}
                    className="text-primary-500 text-sm hover:text-primary-700"
                  >
                    Edit
                  </button>
                </h2>
              )}

              {/* Email */}
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-1">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          {/* Scrollable UserProfile */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 p-2">
            <div className="min-w-[600px]">
              <UserProfile
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none p-0",
                  },
                }}
              />
            </div>
          </div>

          {/* Sign out button */}
          <div className="mt-8 flex justify-center">
            <UserButton
              afterSignOutUrl="/login"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
