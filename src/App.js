import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi, { API_MODE } from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useUser } from '@clerk/clerk-react';

function App() {
  const dispatch = useDispatch()
  const { isLoaded, isSignedIn, user } = useUser();
  const [cartProductCount,setCartProductCount] = useState(0)

  // 🔹 Sync Clerk user with Redux
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      dispatch(setUserDetails({
        _id: user.id,
        name: user.fullName || `${user.firstName} ${user.lastName}`.trim(),
        email: user.primaryEmailAddress?.emailAddress,
        profilePic: user.imageUrl,
        role: 'USER'
      }))
    } else if (isLoaded && !isSignedIn) {
      if (API_MODE === 'dummyjson') {
        dispatch(setUserDetails({
          _id: 'guest',
          name: 'Guest User',
          email: 'guest@TechLoom.com',
          role: 'USER'
        }))
      } else {
        dispatch(setUserDetails(null))
      }
    }
  }, [isLoaded, isSignedIn, user, dispatch])

  const fetchUserDetails = async()=> {
    console.log('User details now managed by Clerk')
  }

  const fetchUserAddToCart = async()=> {
    try {
      if (API_MODE === 'dummyjson') {
        const cart = JSON.parse(localStorage.getItem('dummyCart') || '[]')
        const count = cart.reduce((total, item) => total + item.quantity, 0)
        setCartProductCount(count)
      } else {
        const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
          method : SummaryApi.addToCartProductCount.method,
          credentials : 'include'
        })
        const dataApi = await dataResponse.json()
        setCartProductCount(dataApi?.data?.count)
      }
    } catch (error) {
      console.error('Error fetching cart count:', error)
      setCartProductCount(0)
    }
  }

  useEffect(()=> {
    fetchUserDetails()
    fetchUserAddToCart()
  },[])

  return (
    <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}>
      <ToastContainer position='top-center' theme="dark" />
      <Header/>
      <main className='min-h-[calc(100vh-120px)] pt-16 bg-gradient-to-br from-dark-900 to-dark-800'>
        <Outlet/>
      </main>
      <Footer/>
    </Context.Provider>
  );
}

export default App;
