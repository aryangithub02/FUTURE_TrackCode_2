// Login.js
import React, { useContext, useEffect } from 'react';
import loginIcons from '../assest/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignIn, useUser, useClerk } from '@clerk/clerk-react';
import Context from '../context';

const Login = () => {
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      navigate(`/?username=${user.username || user.firstName || ''}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success("Signed in successfully!");
        fetchUserDetails();
        fetchUserAddToCart();
        navigate(`/?username=${result.user?.username || result.user?.firstName || ''}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error during sign in:", err);
      toast.error(err.errors?.[0]?.message || "Failed to sign in. Please check your credentials.");
    }
  };

  // Google OAuth handler
  const handleGoogleLogin = () => {
    openSignIn({
      strategy: 'oauth_google',
      redirectUrl: '/',   // 👈 fixed (Home is at "/")
    });
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>

          {/* Email + Password login */}
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email : </label>
              <div className='bg-dark-700 p-2 border border-neon-blue/20 rounded'>
                <input
                  type='email'
                  placeholder='enter email'
                  name='email'
                  className='w-full h-full outline-none bg-transparent text-white'
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className='bg-dark-700 p-2 border border-neon-blue/20 rounded'>
                <input
                  type="password"
                  placeholder='enter password'
                  name='password'
                  className='w-full h-full outline-none bg-transparent text-white'
                />
              </div>
              <Link
                to={'/forgot-password'}
                className='block w-fit ml-auto hover:underline text-neon-blue hover:text-neon-purple transition-colors'
              >
                Forgot password ?
              </Link>
            </div>

            <button
              type="submit"
              className='bg-neon-blue hover:bg-neon-blue/80 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 shadow-glow-sm hover:shadow-glow-md'>
              Login
            </button>
          </form>

          {/* Google Login button */}
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 w-full rounded-full transition-all shadow-md"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login with Google
            </button>
          </div>

          <p className='my-5 text-center'>
            Don't have account?{' '}
            <Link to={"/sign-up"} className='text-neon-blue hover:text-neon-purple hover:underline transition-colors'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
