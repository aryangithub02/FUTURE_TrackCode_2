import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

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
    <header className='h-16 shadow-lg bg-gradient-to-r from-primary-600 to-primary-700 fixed w-full z-40 backdrop-blur-sm'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
            <div className='flex items-center space-x-2'>
                <Link to={"/"} className='transform hover:scale-105 transition-transform duration-200'>
                    <div className='bg-white rounded-full p-2 shadow-lg'>
                        <Logo w={90} h={50}/>
                    </div>
                </Link>
                <span className='text-white font-bold text-xl hidden sm:block'>TechStore</span>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-lg mx-8'>
                <div className='relative w-full'>
                    <input 
                        type='text' 
                        placeholder='Search for amazing products...' 
                        className='w-full py-3 px-4 pr-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300' 
                        onChange={handleSearch} 
                        value={search}
                    />
                    <div className='absolute right-1 top-1 bottom-1 bg-secondary-500 hover:bg-secondary-600 flex items-center justify-center rounded-full px-4 text-white cursor-pointer transition-colors duration-300'>
                      <GrSearch className='text-lg' />
                    </div>
                </div>
            </div>


            <div className='flex items-center gap-4'>
                
                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-2xl cursor-pointer relative flex justify-center p-2 hover:bg-white/10 rounded-full transition-colors duration-300' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-8 h-8 rounded-full border-2 border-white/30' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser className='text-white'/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-14 h-fit p-1 shadow-xl rounded-lg border border-gray-100 min-w-[150px]' >
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-primary-50 p-3 rounded-lg text-gray-700 hover:text-primary-600 transition-all duration-300' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                         
                        </nav>
                      </div>
                    )
                  }
                 
                </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-xl relative p-2 hover:bg-white/10 rounded-full transition-colors duration-300'>
                          <span><FaShoppingCart className='text-white'/></span>
      
                          <div className='bg-secondary-500 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-1 shadow-lg'>
                              <p className='text-xs font-semibold'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }
              


                <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-6 py-2 rounded-full text-white bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 font-semibold shadow-lg transform hover:scale-105 transition-all duration-300'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-6 py-2 rounded-full text-white bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 font-semibold shadow-lg transform hover:scale-105 transition-all duration-300'>Login</Link>
                    )
                  }
                    
                </div>

            </div>

      </div>
    </header>
  )
}

export default Header