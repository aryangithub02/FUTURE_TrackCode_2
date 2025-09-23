import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
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
                <h2 className='text-3xl font-bold text-neon-blue font-heading'>{heading}</h2>
                <div className='flex gap-2'>
                    <button className='bg-dark-700 border border-neon-blue text-neon-blue rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-[0_0_5px_rgba(0,242,255,0.3)] hover:shadow-[0_0_10px_rgba(0,242,255,0.5)] hover:bg-neon-blue hover:text-dark-900' onClick={scrollLeft}><FaAngleLeft/></button>
                    <button className='bg-dark-700 border border-neon-blue text-neon-blue rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-[0_0_5px_rgba(0,242,255,0.3)] hover:shadow-[0_0_10px_rgba(0,242,255,0.5)] hover:bg-neon-blue hover:text-dark-900' onClick={scrollRight}><FaAngleRight/></button>
                </div>
            </div>

                
           <div className='flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div key={index} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-backgroundCard rounded-2xl shadow-lg border border-secondary overflow-hidden flex flex-col'>
                                <div className='bg-gradient-to-br from-secondary to-backgroundCard h-56 p-4 flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-6 space-y-4 flex-grow'>
                                    <h2 className='font-medium text-base md:text-lg bg-gradient-to-r from-secondary to-backgroundCard animate-pulse h-5 rounded-lg'></h2>
                                    <p className='bg-gradient-to-r from-secondary to-backgroundCard animate-pulse h-3 w-24 rounded-lg'></p>
                                    <div className='flex gap-3'>
                                        <p className='bg-gradient-to-r from-secondary to-backgroundCard animate-pulse h-4 w-20 rounded-lg'></p>
                                        <p className='bg-gradient-to-r from-secondary to-backgroundCard animate-pulse h-4 w-16 rounded-lg'></p>
                                    </div>
                                </div>
                                <div className='px-6 pb-6'>
                                    <div className='bg-gradient-to-r from-secondary to-backgroundCard animate-pulse h-10 rounded-full'></div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <div key={index} className='group w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-backgroundCard rounded-2xl border border-secondary hover:border-primary/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(29,185,255,0.2)] flex flex-col'>
                                <Link to={"product/"+product?._id} className='flex flex-col flex-grow'>
                                    <div className='bg-gradient-to-br from-secondary to-backgroundCard h-56 p-4 flex justify-center items-center relative overflow-hidden'>
                                        <img src={product.productImage[0]} className='object-cover h-full w-full group-hover:scale-110 transition-transform duration-500'/>
                                        <div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300'></div>
                                    </div>
                                    <div className='p-6 space-y-4 flex-grow'>
                                        <div>
                                            <h2 className='font-semibold text-lg text-ellipsis line-clamp-2 text-textPrimary group-hover:text-primary transition-colors duration-300 leading-tight'>{product?.productName}</h2>
                                            <p className='capitalize text-textSecondary text-sm mt-2 font-medium'>{product?.category}</p>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-primary font-bold text-xl hover:animate-neon-pulse'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                                <p className='text-textSecondary line-through text-sm'>{ displayINRCurrency(product?.price) }</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='px-6 pb-6'>
                                    <button 
                                        className='w-full bg-primary text-white hover:bg-accent py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 font-ui' 
                                        onClick={(e)=>handleAddToCart(e,product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )
                
            }
           </div>
            

    </div>
  )
}

export default VerticalCardProduct