import React from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse bg-dark-700 rounded-lg p-8 w-full max-w-md">
          <div className="h-4 bg-dark-600 rounded w-3/4 mb-4 mx-auto"></div>
          <div className="h-4 bg-dark-600 rounded w-1/2 mb-8 mx-auto"></div>
          <div className="h-10 bg-dark-600 rounded w-full mb-4"></div>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    
    if (!code) {
      toast.error("Please enter the verification code");
      return;
    }
    
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Email verified successfully!");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during verification:", err);
      toast.error(err.errors?.[0]?.message || "Failed to verify email. Please try again.");
    }
  };

  const resendCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification();
      toast.info("Verification email sent. Please check your inbox.");
    } catch (err) {
      console.error("Error resending code:", err);
      toast.error("Failed to resend verification code. Please try again.");
    }
  };

  return (
    <section id="verify-email" className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="bg-dark-800 border border-neon-blue/20 rounded-lg overflow-hidden shadow-lg max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            Verify Your Email
          </h1>
          
          <p className="text-dark-200 mb-6 text-center">
            We've sent a verification code to your email address. Please enter it below to complete your registration.
          </p>
          
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-dark-100 mb-2">Verification Code</label>
              <input 
                type="text" 
                name="code" 
                placeholder="Enter verification code" 
                className="w-full p-3 bg-dark-700 border border-neon-blue/20 rounded text-white focus:border-neon-blue/50 focus:outline-none"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-neon-blue hover:bg-neon-blue/80 text-white py-3 rounded-md transition-all shadow-glow-sm hover:shadow-glow-md"
            >
              Verify Email
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={resendCode}
              className="text-neon-blue hover:text-neon-purple transition-colors"
            >
              Resend verification code
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-dark-300 hover:text-neon-blue transition-colors">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;