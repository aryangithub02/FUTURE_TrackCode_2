import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegUserCircle, FaUsers, FaBoxOpen, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation items
    const navigationItems = [
        {
            path: "all-users",
            label: "All Users",
            icon: <FaUsers className="text-lg" />,
            description: "Manage user accounts"
        },
        {
            path: "all-products", 
            label: "All Products",
            icon: <FaBoxOpen className="text-lg" />,
            description: "Manage product catalog"
        }
    ];



    // Handle logout
    const handleLogout = () => {
        // Add your logout logic here
        navigate("/");
    };

    // Check if current path is active
    const isActivePath = (path) => {
        return location.pathname.includes(path);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close mobile menu when navigation item is clicked
    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Mobile Header */}
            <div className='md:hidden bg-white shadow-md p-4 flex justify-between items-center'>
                <div className='flex items-center space-x-3'>
                    <div className='text-2xl'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-8 h-8 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegUserCircle className="text-gray-600" />
                        )}
                    </div>
                    <div>
                        <p className='font-semibold text-gray-800'>{user?.name}</p>
                        <p className='text-xs text-gray-500'>{user?.role}</p>
                    </div>
                </div>
                <button 
                    onClick={toggleMobileMenu}
                    className='text-2xl text-gray-600 hover:text-gray-800 transition-colors'
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40' onClick={toggleMobileMenu}>
                    <div className='bg-white w-80 h-full shadow-lg' onClick={e => e.stopPropagation()}>
                        <div className='p-6 border-b'>
                            <div className='flex items-center space-x-4'>
                                <div className='text-4xl'>
                                    {user?.profilePic ? (
                                        <img src={user?.profilePic} className='w-16 h-16 rounded-full' alt={user?.name} />
                                    ) : (
                                        <FaRegUserCircle className="text-gray-600" />
                                    )}
                                </div>
                                <div>
                                    <p className='font-bold text-lg text-gray-800'>{user?.name}</p>
                                    <p className='text-sm text-gray-500 capitalize'>{user?.role}</p>
                                </div>
                            </div>
                        </div>
                        
                        <nav className='p-4 space-y-2'>
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={handleNavClick}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActivePath(item.path)
                                            ? 'bg-blue-100 text-blue-700 shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    <div>
                                        <div className='font-medium'>{item.label}</div>
                                        <div className='text-xs text-gray-500'>{item.description}</div>
                                    </div>
                                </Link>
                            ))}
                        </nav>

                        <div className='absolute bottom-0 left-0 right-0 p-4 border-t'>
                            <button
                                onClick={handleLogout}
                                className='flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex'>
                {/* Desktop Sidebar */}
                <aside className='hidden md:flex flex-col bg-white shadow-lg w-80 min-h-screen'>
                    {/* Profile Section */}
                    <div className='p-8 border-b bg-gradient-to-r from-blue-50 to-indigo-50'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='mb-4 relative'>
                                <div className='w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
                                    {user?.profilePic ? (
                                        <img 
                                            src={user?.profilePic} 
                                            className='w-full h-full object-cover' 
                                            alt={user?.name || 'User'} 
                                        />
                                    ) : (
                                        <FaRegUserCircle className="text-4xl text-gray-400" />
                                    )}
                                </div>
                                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
                            </div>
                            <h2 className='text-xl font-bold text-gray-800 mb-1'>
                                {user?.name || 'Admin User'}
                            </h2>
                            <p className='text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full capitalize'>
                                {user?.role || 'Administrator'}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className='flex-1 p-6'>
                        <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4'>
                            Management
                        </h3>
                        <div className='space-y-2'>
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                        isActivePath(item.path)
                                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${
                                        isActivePath(item.path)
                                            ? 'bg-blue-500'
                                            : 'bg-gray-200 group-hover:bg-gray-300'
                                    }`}>
                                        {item.icon}
                                    </div>
                                    <div className='flex-1'>
                                        <div className='font-medium'>{item.label}</div>
                                        <div className={`text-xs ${
                                            isActivePath(item.path) 
                                                ? 'text-blue-200' 
                                                : 'text-gray-500'
                                        }`}>
                                            {item.description}
                                        </div>
                                    </div>
                                    {isActivePath(item.path) && (
                                        <div className='w-2 h-2 bg-white rounded-full'></div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Logout Section */}
                    <div className='p-6 border-t'>
                        <button
                            onClick={handleLogout}
                            className='flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group'
                        >
                            <div className='p-2 bg-red-100 rounded-lg group-hover:bg-red-200'>
                                <FaSignOutAlt />
                            </div>
                            <span className='font-medium'>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className='flex-1 min-h-screen'>
                    <div className='p-6 md:p-8'>
                        {/* Content Header */}
                        <div className='mb-8'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
                                        Admin Dashboard
                                    </h1>
                                    <p className='text-gray-600 mt-1'>
                                        Welcome back, {user?.name}! Here's what's happening with your store.
                                    </p>
                                </div>
                                <div className='hidden md:flex items-center space-x-4'>
                                    <div className='text-sm text-gray-500'>
                                        Last login: {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Outlet for nested routes */}
                        <div className='bg-white rounded-2xl shadow-sm min-h-[600px] overflow-hidden'>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;