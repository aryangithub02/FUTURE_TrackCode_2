import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaStarHalf, FaRegStar, FaShippingFast, FaShieldAlt, FaUndo } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import dummyJsonApi from '../services/dummyJsonApi';
import SummaryApi, { API_MODE } from '../common';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  // Fetch Product Details
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      if (API_MODE === 'dummyjson') {
        const response = await dummyJsonApi.getProductById(params?.id);
        if (response.success) {
          setData(response.data);
          setActiveImage(response.data?.productImage[0]);
        }
      } else {
        const response = await fetch(SummaryApi.productDetails.url, {
          method: SummaryApi.productDetails.method,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ productId: params?.id })
        });
        const dataReponse = await response.json();
        setData(dataReponse?.data);
        setActiveImage(dataReponse?.data?.productImage[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    setZoomImageCoordinate({ x: (e.clientX - left) / width, y: (e.clientY - top) / height });
  }, []);

  const handleLeaveImageZoom = () => setZoomImage(false);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className='text-yellow-400' />);
    if (hasHalfStar) stars.push(<FaStarHalf key='half' className='text-yellow-400' />);
    for (let i = stars.length; i < 5; i++) stars.push(<FaRegStar key={`empty-${i}`} className='text-gray-500' />);
    return stars;
  };

  return (
    <div className='container mx-auto p-4 bg-dark-900 text-gray-100'>
      {/* Product Section */}
      <div className='flex flex-col lg:flex-row gap-6 rounded-xl bg-dark-800 p-6 shadow-lg border border-neon-blue/10'>
        {/* Product Images */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Main Image */}
          <div className='h-80 w-full lg:h-96 lg:w-96 bg-dark-700 relative p-2 rounded-lg border border-neon-blue/20 overflow-hidden group'>
            <img
              src={activeImage}
              alt="product"
              className='h-full w-full object-contain transition-all duration-300 group-hover:scale-105'
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {zoomImage && (
              <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] bg-dark-700 p-1 -right-[510px] top-0 border border-neon-blue/30 rounded-lg shadow-lg z-50'>
                <div
                  className='w-full h-full scale-150'
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2 scrollbar-none'>
            {(loading ? productImageListLoading : data?.productImage)?.map((img, idx) => (
              <div
                key={idx}
                className='h-20 w-20 bg-dark-700 rounded-lg p-1 border border-neon-blue/20 transition-all hover:border-neon-blue/80 hover:shadow-md cursor-pointer'
                onMouseEnter={() => handleMouseEnterProduct(img)}
              >
                <img src={img} alt={`thumb-${idx}`} className='w-full h-full object-contain' />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-4 max-w-2xl'>
          {/* Brand & Name */}
          <span className='bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold'>{data.brandName || 'Brand'}</span>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-100'>{data.productName}</h1>
          <p className='text-gray-400 text-lg capitalize'>{API_MODE === 'dummyjson' ? dummyJsonApi.getCategoryDisplayName(data.category) : data.category}</p>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            {renderStars(data.rating || 0)}
            <span className='text-gray-400'>({data.rating || 0})</span>
          </div>

          {/* Price */}
          <div className='flex items-baseline gap-4'>
            <span className='text-3xl lg:text-4xl font-bold text-primary-600'>{displayINRCurrency(data.sellingPrice)}</span>
            {data.price !== data.sellingPrice && <span className='text-xl text-gray-500 line-through'>{displayINRCurrency(data.price)}</span>}
          </div>

          {/* Stock */}
          {data.stock && (
            <div className='flex items-center gap-2'>
              <div className={`w-3 h-3 rounded-full ${data.stock > 10 ? 'bg-green-500' : data.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className='text-gray-400'>{data.stock > 10 ? 'In Stock' : data.stock > 0 ? `Only ${data.stock} left` : 'Out of Stock'}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <button
              onClick={(e) => handleBuyProduct(e, data?._id)}
              disabled={data.stock === 0}
              className='flex-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all disabled:opacity-50'>
              Buy Now
            </button>
            <button
              onClick={(e) => handleAddToCart(e, data?._id)}
              disabled={data.stock === 0}
              className='flex-1 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all disabled:opacity-50'>
              Add To Cart
            </button>
          </div>

          {/* Features */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-700'>
            <div className='flex items-center gap-2'>
              <FaShippingFast className='text-primary-500 text-xl' />
              <p className='text-gray-400'>Free Shipping</p>
            </div>
            <div className='flex items-center gap-2'>
              <FaShieldAlt className='text-primary-500 text-xl' />
              <p className='text-gray-400'>Warranty</p>
            </div>
            <div className='flex items-center gap-2'>
              <FaUndo className='text-primary-500 text-xl' />
              <p className='text-gray-400'>Return Policy</p>
            </div>
          </div>

          {/* Description */}
          <div className='pt-6 border-t border-gray-700'>
            <h3 className='text-xl font-semibold mb-2'>Description</h3>
            <p className='text-gray-400 leading-relaxed'>{data.description}</p>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {data.category && (
        <div className='mt-12'>
          <CategroyWiseProductDisplay category={data.category} heading={"Recommended Products"} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
