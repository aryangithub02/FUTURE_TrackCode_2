import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white mt-20'>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4'>TechStore</h3>
            <p className='text-gray-300 mb-6 leading-relaxed'>Your one-stop destination for premium electronics and gadgets. Discover amazing products at unbeatable prices.</p>
            <div className='flex space-x-4'>
              <div className='w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer'>
                <span className='text-sm font-bold'>f</span>
              </div>
              <div className='w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer'>
                <span className='text-sm font-bold'>t</span>
              </div>
              <div className='w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer'>
                <span className='text-sm font-bold'>i</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Home</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Shop</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Categories</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>About Us</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Customer Service</h4>
            <ul className='space-y-2'>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Help Center</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Returns</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Shipping Info</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Privacy Policy</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className='border-t border-gray-700 mt-12 pt-8 text-center'>
          <p className='text-gray-400'>© 2024 TechStore. All rights reserved. Built with modern design and innovation.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer