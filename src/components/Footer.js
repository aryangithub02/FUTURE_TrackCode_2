import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-backgroundMain text-textPrimary mt-20 border-t border-primary/30'>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-3xl font-bold text-primary animate-neon-pulse mb-4 font-heading'>TechStore</h3>
            <p className='text-textSecondary mb-6 leading-relaxed font-body'>Your one-stop destination for premium electronics and gadgets. Discover amazing products at unbeatable prices.</p>
            <div className='flex space-x-4'>
              <div className='w-10 h-10 bg-backgroundCard border border-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-backgroundMain transition-all duration-300 cursor-pointer shadow-[0_0_5px_rgba(29,185,255,0.3)] hover:shadow-[0_0_10px_rgba(29,185,255,0.5)] font-ui'>
                <span className='text-sm font-bold'>f</span>
              </div>
              <div className='w-10 h-10 bg-backgroundCard border border-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-backgroundMain transition-all duration-300 cursor-pointer shadow-[0_0_5px_rgba(29,185,255,0.3)] hover:shadow-[0_0_10px_rgba(29,185,255,0.5)] font-ui'>
                <span className='text-sm font-bold'>t</span>
              </div>
              <div className='w-10 h-10 bg-backgroundCard border border-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-backgroundMain transition-all duration-300 cursor-pointer shadow-[0_0_5px_rgba(29,185,255,0.3)] hover:shadow-[0_0_10px_rgba(29,185,255,0.5)] font-ui'>
                <span className='text-sm font-bold'>i</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-primary font-heading'>Quick Links</h4>
            <ul className='space-y-2 font-body'>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Home</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Shop</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Categories</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>About Us</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-primary font-heading'>Customer Service</h4>
            <ul className='space-y-2 font-body'>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Help Center</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Returns</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Shipping Info</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Privacy Policy</a></li>
              <li><a href='#' className='text-textSecondary hover:text-primary transition-colors duration-300'>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-primary/30 text-center text-textSecondary font-body'>
          <p>&copy; 2024 TechStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer