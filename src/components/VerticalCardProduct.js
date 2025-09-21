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

    const [scroll,setScroll] = useState(0)
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

        console.log("horizontal data",categoryProduct.data)
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
                <h2 className='text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent'>{heading}</h2>
                <div className='flex gap-2'>
                    <button className='bg-primary-100 hover:bg-primary-200 text-primary-600 rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-md' onClick={scrollLeft}><FaAngleLeft/></button>
                    <button className='bg-primary-100 hover:bg-primary-200 text-primary-600 rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-md' onClick={scrollRight}><FaAngleRight/></button>
                </div>
            </div>

                
           <div className='flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div key={index} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-2xl shadow-card overflow-hidden'>
                                <div className='bg-gradient-to-br from-gray-100 to-gray-200 h-56 p-4 flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-6 space-y-4'>
                                    <h2 className='bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-5 rounded-lg'></h2>
                                    <p className='bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-3 w-24 rounded-lg'></p>
                                    <div className='flex gap-3'>
                                        <p className='bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-4 w-20 rounded-lg'></p>
                                        <p className='bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-4 w-16 rounded-lg'></p>
                                    </div>
                                    <div className='bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse h-10 rounded-full'></div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <div key={index} className='group w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 transform hover:-translate-y-2'>
                                <Link to={"product/"+product?._id}>
                                    <div className='bg-gradient-to-br from-gray-50 to-gray-100 h-56 p-4 flex justify-center items-center relative overflow-hidden'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full max-h-48 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply'/>
                                        <div className='absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors duration-300'></div>
                                    </div>
                                    <div className='p-6 space-y-4'>
                                        <div>
                                            <h2 className='font-semibold text-lg text-ellipsis line-clamp-2 text-gray-800 group-hover:text-primary-600 transition-colors duration-300 leading-tight'>{product?.productName}</h2>
                                            <p className='capitalize text-gray-500 text-sm mt-2 font-medium'>{product?.category}</p>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-primary-600 font-bold text-xl'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                                <p className='text-gray-400 line-through text-sm'>{ displayINRCurrency(product?.price) }</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='px-6 pb-6'>
                                    <button 
                                        className='w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300' 
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