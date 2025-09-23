import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const scrollElement = useRef()


    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto px-4 my-12 relative'>

            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent hover:animate-neon-pulse'>{heading}</h2>
                <div className='flex gap-3'>
                    <button className='bg-dark-800 hover:bg-dark-700 text-neon-blue border border-neon-blue rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-glow hover:animate-glow' onClick={scrollLeft}><FaAngleLeft size={18}/></button>
                    <button className='bg-dark-800 hover:bg-dark-700 text-neon-blue border border-neon-blue rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-glow hover:animate-glow' onClick={scrollRight}><FaAngleRight size={18}/></button>
                </div>
            </div>

                
           <div className='flex items-center gap-6 overflow-x-auto scrollbar-none transition-all pb-4' ref={scrollElement}>

           {   loading ? (
                loadingList.map((product,index)=>{
                    return(
                        <div key={index} className='w-full min-w-[300px] md:min-w-[360px] max-w-[300px] md:max-w-[360px] h-40 bg-dark-800 rounded-2xl shadow-card border border-dark-600 flex overflow-hidden'>
                            <div className='bg-gradient-to-br from-dark-700 to-dark-800 h-full p-4 min-w-[140px] md:min-w-[160px] shimmer'>
                            </div>
                            <div className='p-6 grid w-full gap-3'>
                                <h2 className='font-medium text-base md:text-lg bg-gradient-to-r from-dark-600 to-dark-700 shimmer h-5 rounded-lg'></h2>
                                <p className='bg-gradient-to-r from-dark-600 to-dark-700 shimmer h-3 w-20 rounded-lg'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='bg-gradient-to-r from-dark-600 to-dark-700 w-16 shimmer h-4 rounded-lg'></p>
                                    <p className='bg-gradient-to-r from-dark-600 to-dark-700 w-16 shimmer h-4 rounded-lg'></p>
                                </div>
                                <div className='bg-gradient-to-r from-dark-600 to-dark-700 shimmer h-8 rounded-full'></div>
                            </div>
                        </div>
                    )
                })
           ) : (
            data.map((product,index)=>{
                return(
                    <div key={index} className='group relative w-full min-w-[300px] md:min-w-[360px] max-w-[300px] md:max-w-[360px] h-40 bg-backgroundCard rounded-2xl shadow-card border border-secondary hover:border-primary hover:shadow-glow flex overflow-hidden transition-all duration-300 transform hover:-translate-y-1'>
                        <Link to={"/product/"+product?._id} className='flex w-full'>
                            <div className='bg-gradient-to-br from-secondary to-backgroundCard h-full w-1/3 p-4 flex items-center justify-center relative overflow-hidden'>
                                <div className='absolute inset-0 bg-gradient-to-br from-backgroundCard/50 to-backgroundCard/50 opacity-70 group-hover:opacity-0 transition-opacity duration-300'></div>
                                <img src={product.productImage[0]} className='object-contain h-full w-full group-hover:scale-110 transition-transform duration-300 z-10'/>
                            </div>
                            <div className='p-6 flex flex-col justify-between flex-1'>
                                <div>
                                    <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-2 text-textPrimary group-hover:text-primary transition-colors duration-300'>{product?.productName}</h2>
                                    <p className='capitalize text-textSecondary text-sm mt-1 font-medium'>{product?.category}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <p className='text-primary font-bold text-lg group-hover:animate-neon-pulse'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                        <p className='text-textSecondary line-through text-sm'>{ displayINRCurrency(product?.price)  }</p>
                                    </div>
                                    <button 
                                        className='bg-primary text-backgroundMain border border-primary hover:bg-accent hover:text-backgroundMain px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(29,185,255,0.5)] font-ui' 
                                        onClick={(e)=>handleAddToCart(e,product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
           )
               
            }
           </div>
            

    </div>
  )
}

export default HorizontalCardProduct