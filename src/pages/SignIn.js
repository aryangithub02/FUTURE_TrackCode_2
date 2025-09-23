// src/pages/SignIn.js
import React from "react";
import { SignIn as ClerkSignIn, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();

  if (location.hash === "#/sso-callback" || location.pathname.includes("sso-callback")) {
    return <AuthenticateWithRedirectCallback />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8">
        <ClerkSignIn
          routing="path"
          path="/login"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg rounded-2xl",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
