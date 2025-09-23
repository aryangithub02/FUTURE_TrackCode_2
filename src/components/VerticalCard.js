import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-6 md:gap-8 overflow-x-scroll scrollbar-none transition-all'>
    {

         loading ? (
             loadingList.map((product,index)=>{
                 return(
                     <div className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-backgroundCard rounded-xl shadow-card border border-secondary flex flex-col'>
                         <div className='bg-gradient-to-br from-secondary to-backgroundCard h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                         </div>
                         <div className='p-4 grid gap-3 flex-grow'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 animate-pulse rounded-full bg-secondary'></h2>
                             <p className='capitalize p-1 animate-pulse rounded-full bg-secondary py-2'></p>
                             <div className='flex gap-3'>
                                 <p className='font-medium p-1 animate-pulse rounded-full bg-secondary w-full py-2'></p>
                                 <p className='line-through p-1 animate-pulse rounded-full bg-secondary w-full py-2'></p>
                             </div>
                         </div>
                         <div className='px-4 pb-4'>
                            <button className='text-sm px-3 rounded-full bg-secondary py-2 animate-pulse w-full'></button>
                         </div>
                     </div>
                 )
             })
         ) : (
             data.map((product,index)=>{
                 return(
                     <Link to={"/product/"+product?._id} className='group w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-backgroundCard rounded-xl shadow-card border border-secondary hover:border-primary hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2 hover:animate-hover-up' onClick={scrollTop}>
                         <div className='bg-gradient-to-br from-secondary to-backgroundCard h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center relative overflow-hidden'>
                             <img src={product?.productImage[0]} className='object-cover h-full w-full group-hover:scale-110 transition-transform duration-500 mix-blend-luminosity group-hover:mix-blend-normal'/>
                             <div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300'></div>
                         </div>
                         <div className='p-4 grid gap-3 flex-grow'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-textPrimary group-hover:text-primary transition-colors duration-300'>{product?.productName}</h2>
                             <p className='capitalize text-textSecondary text-sm'>{product?.category}</p>
                             <div className='flex gap-3'>
                                 <p className='text-primary font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                 <p className='text-textSecondary line-through'>{ displayINRCurrency(product?.price)  }</p>
                             </div>
                         </div>
                         <div className='px-4 pb-4'>
                            <button className='btn-neon text-sm px-3 py-1.5 rounded-full font-medium shadow-md transform hover:scale-105 transition-all duration-300 w-full bg-primary text-backgroundMain hover:bg-accent' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                         </div>
                     </Link>
                 )
             })
         )
         
     }
    </div>
  )
}

export default VerticalCard