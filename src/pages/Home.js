import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <CategoryList/>
      <BannerProduct/>

      {/* Featured Products Section */}
      <div className='bg-white py-8'>
        <HorizontalCardProduct category={"beauty"} heading={"💄 Beauty Products"}/>
        <HorizontalCardProduct category={"mens-watches"} heading={"⌚ Men's Watches"}/>
      </div>

      {/* Main Products Grid */}
      <div className='space-y-4'>
        <VerticalCardProduct category={"smartphones"} heading={"📱 Latest Smartphones"}/>
        <VerticalCardProduct category={"laptops"} heading={"💻 Laptops & Computers"}/>
        <VerticalCardProduct category={"furniture"} heading={"🪑 Home & Furniture"}/>
        <VerticalCardProduct category={"fragrances"} heading={"🌸 Fragrances & Perfumes"}/>
        <VerticalCardProduct category={"groceries"} heading={"🛒 Groceries & Food"}/>
        <VerticalCardProduct category={"womens-dresses"} heading={"👗 Women's Dresses"}/>
        <VerticalCardProduct category={"mens-shirts"} heading={"👔 Men's Shirts"}/>
        <VerticalCardProduct category={"sunglasses"} heading={"🕶️ Sunglasses"}/>
      </div>
    </div>
  )
}

export default Home