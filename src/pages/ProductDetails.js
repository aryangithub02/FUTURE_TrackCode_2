import React, { useCallback, useContext, useEffect, useState } from 'react'
import  { useNavigate, useParams } from 'react-router-dom'
import SummaryApi, { API_MODE } from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaShippingFast, FaShieldAlt, FaUndo } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import dummyJsonApi from '../services/dummyJsonApi';

const ProductDetails = () => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage,setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    try {
      if (API_MODE === 'dummyjson') {
        const response = await dummyJsonApi.getProductById(params?.id)
        if (response.success) {
          setData(response.data)
          setActiveImage(response.data?.productImage[0])
        } else {
          console.error('Product not found')
        }
      } else {
        const response = await fetch(SummaryApi.productDetails.url,{
          method : SummaryApi.productDetails.method,
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            productId : params?.id
          })
        })
        const dataReponse = await response.json()
        setData(dataReponse?.data)
        setActiveImage(dataReponse?.data?.productImage[0])
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoading(false)
    }
  }

  console.log("data",data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (imageURL)=>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const { left , top, width , height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  },[zoomImageCoordinate])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }


  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className='text-yellow-500' />)
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalf key='half' className='text-yellow-500' />)
    }
    
    const remainingStars = 5 - stars.length
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className='text-gray-300' />)
    }
    
    return stars
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
          {/***product Image */}
          <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

              <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                  <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

                    {/**product zoom */}
                    {
                      zoomImage && (
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                          <div
                            className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                            style={{
                              background : `url(${activeImage})`,
                              backgroundRepeat : 'no-repeat',
                              backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
    
                            }}
                          >
    
                          </div>
                        </div>
                      )
                    }
                  
              </div>

              <div className='h-full'>
                  {
                    loading ? (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          productImageListLoading.map((el,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                              </div>
                            )
                          })
                        }
                      </div>
                      
                    ) : (
                      <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                        {
                          data?.productImage?.map((imgURL,index) =>{
                            return(
                              <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  }
              </div>
          </div>

           {/***product details */}
           {
            loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>
    
                </div>

                <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                  <p className='text-red-600 bg-slate-200 w-full'></p>
                  <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                </div>

                <div className='flex items-center gap-3 my-2 w-full'>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                  <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                </div>

                <div className='w-full'>
                  <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                  <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                </div>
              </div>
            ) : 
            (
              <div className='flex flex-col gap-6 max-w-2xl'>
                {/* Brand and Category */}
                <div className='space-y-2'>
                  <span className='bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold inline-block'>
                    {data?.brandName || 'Premium Brand'}
                  </span>
                  <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 leading-tight'>{data?.productName}</h1>
                  <p className='text-gray-600 text-lg capitalize'>
                    {API_MODE === 'dummyjson' ? dummyJsonApi.getCategoryDisplayName(data?.category) : data?.category}
                  </p>
                </div>

                {/* Rating and Reviews */}
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    {renderStars(data?.rating || 0)}
                  </div>
                  <span className='text-gray-600 text-lg font-medium'>({data?.rating || 0})</span>
                  {data?.reviews && (
                    <span className='text-gray-500'>• {data.reviews.length} reviews</span>
                  )}
                </div>

                {/* Price */}
                <div className='space-y-2'>
                  <div className='flex items-baseline gap-4'>
                    <span className='text-3xl lg:text-4xl font-bold text-primary-600'>
                      {displayINRCurrency(data.sellingPrice)}
                    </span>
                    {data.price !== data.sellingPrice && (
                      <span className='text-xl text-gray-400 line-through'>
                        {displayINRCurrency(data.price)}
                      </span>
                    )}
                  </div>
                  {data.discountPercentage && (
                    <span className='bg-secondary-100 text-secondary-700 px-2 py-1 rounded-md text-sm font-semibold'>
                      {Math.round(data.discountPercentage)}% OFF
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                {data?.stock && (
                  <div className='flex items-center gap-2'>
                    <div className={`w-3 h-3 rounded-full ${data.stock > 10 ? 'bg-green-500' : data.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className='text-gray-700 font-medium'>
                      {data.stock > 10 ? 'In Stock' : data.stock > 0 ? `Only ${data.stock} left` : 'Out of Stock'}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                  <button 
                    className='flex-1 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={(e)=>handleBuyProduct(e,data?._id)}
                    disabled={data?.stock === 0}
                  >
                    Buy Now
                  </button>
                  <button 
                    className='flex-1 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={(e)=>handleAddToCart(e,data?._id)}
                    disabled={data?.stock === 0}
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Product Features */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200'>
                  <div className='flex items-center gap-3'>
                    <FaShippingFast className='text-primary-600 text-xl' />
                    <div>
                      <p className='font-semibold text-gray-800'>Free Shipping</p>
                      <p className='text-sm text-gray-600'>{data?.shipping || 'Fast delivery'}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaShieldAlt className='text-primary-600 text-xl' />
                    <div>
                      <p className='font-semibold text-gray-800'>Warranty</p>
                      <p className='text-sm text-gray-600'>{data?.warranty || '1 year warranty'}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <FaUndo className='text-primary-600 text-xl' />
                    <div>
                      <p className='font-semibold text-gray-800'>Return Policy</p>
                      <p className='text-sm text-gray-600'>{data?.returnPolicy || '30 days return'}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className='pt-6 border-t border-gray-200'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-3'>Description</h3>
                  <p className='text-gray-700 leading-relaxed'>{data?.description}</p>
                  
                  {/* Additional Details */}
                  {(data?.dimensions || data?.weight) && (
                    <div className='mt-6 grid grid-cols-2 gap-4'>
                      {data?.dimensions && (
                        <div>
                          <h4 className='font-semibold text-gray-800 mb-2'>Dimensions</h4>
                          <p className='text-gray-600 text-sm'>
                            {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm
                          </p>
                        </div>
                      )}
                      {data?.weight && (
                        <div>
                          <h4 className='font-semibold text-gray-800 mb-2'>Weight</h4>
                          <p className='text-gray-600 text-sm'>{data.weight} kg</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
           }

      </div>

      {/* Reviews Section */}
      {data?.reviews && data.reviews.length > 0 && (
        <div className='mt-16 bg-white rounded-2xl shadow-card p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Customer Reviews</h2>
          <div className='space-y-6'>
            {data.reviews.slice(0, 3).map((review, index) => (
              <div key={index} className='border-b border-gray-200 pb-6 last:border-b-0 last:pb-0'>
                <div className='flex items-start justify-between mb-3'>
                  <div>
                    <h4 className='font-semibold text-gray-800'>{review.reviewerName}</h4>
                    <p className='text-gray-600 text-sm'>{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className='flex items-center gap-1'>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className='text-gray-700'>{review.comment}</p>
              </div>
            ))}
            {data.reviews.length > 3 && (
              <div className='text-center pt-4'>
                <p className='text-gray-600'>and {data.reviews.length - 3} more reviews...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {
        data.category && (
          <div className='mt-16'>
            <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Products"}/>
          </div>
        )
      }
     



    </div>
  )
}

export default ProductDetails