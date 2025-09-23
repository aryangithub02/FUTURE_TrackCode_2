import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import ROLE from '../common/role';
import Context from '../context';
import UserButton from './UserButton';

const Header = () => {
  const { isSignedIn, user } = useUser();
  const reduxUser = useSelector(state => state?.user?.user)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${encodeURIComponent(value)}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-lg bg-backgroundMain border-b border-primary/30 fixed w-full z-40 backdrop-blur-sm'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className='flex items-center space-x-2'>
                <Link to={"/"} className='transform hover:scale-105 transition-transform duration-200'>
                    <div className='bg-backgroundCard rounded-full p-2 shadow-lg border border-primary/50 animate-pulse-slow'>
                        <Logo w={90} h={50}/>
                    </div>
                </Link>
                <span className='text-primary font-bold text-xl hidden sm:block font-heading'>TechStore</span>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-lg mx-8'>
                <div className='relative w-full'>
                    <input 
                        type='text' 
                        placeholder='Search for amazing products...' 
                        className='w-full py-3 px-4 pr-12 rounded-full border border-primary/30 bg-backgroundCard/80 backdrop-blur-sm text-textPrimary placeholder-textSecondary outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(29,185,255,0.3)] transition-all duration-300 font-body' 
                        onChange={handleSearch} 
                        value={search}
                    />
                    <div className='absolute right-1 top-1 bottom-1 bg-secondary border border-primary hover:bg-primary hover:text-backgroundMain flex items-center justify-center rounded-full px-4 text-primary cursor-pointer transition-all duration-300 shadow-[0_0_5px_rgba(29,185,255,0.3)] hover:shadow-[0_0_10px_rgba(29,185,255,0.5)]'>
                      <GrSearch className='text-lg' />
                    </div>
                </div>
            </div>


            <div className='flex items-center gap-4'>
                {/* Admin Panel Link - Only visible for admins */}
                {reduxUser?.role === ROLE.ADMIN && (
                  <Link 
                    to={"/admin-panel/all-products"} 
                    className='whitespace-nowrap hidden md:block hover:bg-secondary p-3 rounded-lg text-textPrimary hover:text-primary transition-all duration-300 font-ui'
                  >
                    Admin Panel
                  </Link>
                )}
                
                {/* Shopping Cart - Only visible when signed in */}
                {isSignedIn && (
                  <Link to={"/cart"} className='text-xl relative p-2 hover:bg-secondary rounded-full transition-colors duration-300 group'>
                    <span><FaShoppingCart className='text-primary group-hover:scale-110 transition-transform duration-300'/></span>
    
                    <div className='bg-primary text-backgroundMain w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-1 shadow-[0_0_5px_rgba(29,185,255,0.5)] group-hover:animate-pulse'>
                      <p className='text-xs font-semibold'>{context?.cartProductCount}</p>
                    </div>
                  </Link>
                )}
                
                {/* User Button Component */}
                <UserButton />

            </div>

      </div>
    </header>
  )
}

export default Header