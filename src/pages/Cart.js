import React, { useContext, useEffect, useState } from 'react'
import SummaryApi, { API_MODE } from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { toast } from 'react-toastify'
import dummyJsonApi from '../services/dummyJsonApi'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    // Fetch cart data based on API mode
    const fetchCartData = async() => {
        setLoading(true)
        try {
            if (API_MODE === 'dummyjson') {
                // Get cart from localStorage
                const cart = JSON.parse(localStorage.getItem('dummyCart') || '[]')
                
                // Fetch product details for each cart item
                const cartWithProducts = await Promise.all(
                    cart.map(async (item) => {
                        const productResponse = await dummyJsonApi.getProductById(item.productId)
                        if (productResponse.success) {
                            return {
                                ...item,
                                productDetails: productResponse.data,
                                _id: `${item.productId}-${Date.now()}` // Create unique ID for cart item
                            }
                        }
                        return null
                    })
                )
                
                // Filter out null values (failed product fetches)
                setCartItems(cartWithProducts.filter(item => item !== null))
            } else {
                // Original backend logic
                const response = await fetch(SummaryApi.addToCartProductView.url, {
                    method: SummaryApi.addToCartProductView.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                })
                
                const responseData = await response.json()
                if (responseData.success) {
                    setCartItems(responseData.data)
                }
            }
        } catch (error) {
            console.error('Error fetching cart data:', error)
            toast.error('Failed to load cart items')
        } finally {
            setLoading(false)
        }
    }

    // Update quantity in cart
    const updateQuantity = async(productId, newQuantity) => {
        try {
            if (API_MODE === 'dummyjson') {
                const cart = JSON.parse(localStorage.getItem('dummyCart') || '[]')
                const updatedCart = cart.map(item => 
                    item.productId === productId 
                        ? { ...item, quantity: Math.max(1, newQuantity) }
                        : item
                )
                
                localStorage.setItem('dummyCart', JSON.stringify(updatedCart))
                window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }))
                await fetchCartData() // Refresh cart display
                toast.success('Cart updated successfully!')
            } else {
                // Original backend logic for quantity update
                const response = await fetch(SummaryApi.updateCartProduct.url, {
                    method: SummaryApi.updateCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({
                        _id: productId,
                        quantity: newQuantity
                    })
                })
                
                const responseData = await response.json()
                if (responseData.success) {
                    await fetchCartData()
                }
            }
        } catch (error) {
            console.error('Error updating quantity:', error)
            toast.error('Failed to update quantity')
        }
    }

    // Remove item from cart
    const removeFromCart = async(productId) => {
        try {
            if (API_MODE === 'dummyjson') {
                const cart = JSON.parse(localStorage.getItem('dummyCart') || '[]')
                const updatedCart = cart.filter(item => item.productId !== productId)
                
                localStorage.setItem('dummyCart', JSON.stringify(updatedCart))
                window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }))
                await fetchCartData() // Refresh cart display
                toast.success('Item removed from cart!')
            } else {
                // Original backend logic
                const response = await fetch(SummaryApi.deleteCartProduct.url, {
                    method: SummaryApi.deleteCartProduct.method,
                    credentials: 'include',
                    headers: {
                        "content-type": 'application/json'
                    },
                    body: JSON.stringify({ _id: productId })
                })
                
                const responseData = await response.json()
                if (responseData.success) {
                    await fetchCartData()
                    context.fetchUserAddToCart()
                }
            }
        } catch (error) {
            console.error('Error removing item:', error)
            toast.error('Failed to remove item')
        }
    }

    useEffect(() => {
        fetchCartData()
    }, [])

    // Calculate totals
    const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cartItems.reduce((total, item) => {
        const price = API_MODE === 'dummyjson' 
            ? item.productDetails?.sellingPrice || 0
            : item.productId?.sellingPrice || 0
        return total + (item.quantity * price)
    }, 0)
    
    const totalSavings = cartItems.reduce((total, item) => {
        const originalPrice = API_MODE === 'dummyjson' 
            ? item.productDetails?.price || 0
            : item.productId?.price || 0
        const sellingPrice = API_MODE === 'dummyjson' 
            ? item.productDetails?.sellingPrice || 0
            : item.productId?.sellingPrice || 0
        return total + (item.quantity * (originalPrice - sellingPrice))
    }, 0)
  return (
    <div className='container mx-auto p-4 min-h-screen'>
        {/* Header */}
        <div className='mb-8'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2'>
                Shopping Cart
            </h1>
            <p className='text-gray-600'>Review your items before checkout</p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 && !loading && (
            <div className='bg-white rounded-2xl shadow-card p-12 text-center'>
                <FaShoppingCart className='mx-auto text-6xl text-gray-300 mb-6' />
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Your cart is empty</h2>
                <p className='text-gray-600 mb-6'>Add some products to get started!</p>
                <button 
                    onClick={() => window.history.back()}
                    className='bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300'
                >
                    Continue Shopping
                </button>
            </div>
        )}

        {/* Cart Content */}
        {(cartItems.length > 0 || loading) && (
            <div className='flex flex-col xl:flex-row gap-8'>
                {/* Cart Items */}
                <div className='flex-1 space-y-4'>
                    {loading ? (
                        // Loading skeleton
                        loadingCart.map((_, index) => (
                            <div key={index} className='bg-white rounded-2xl shadow-card p-6 animate-pulse'>
                                <div className='flex gap-4'>
                                    <div className='w-24 h-24 bg-gray-200 rounded-xl'></div>
                                    <div className='flex-1 space-y-3'>
                                        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                                        <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Actual cart items
                        cartItems.map((item) => {
                            const product = API_MODE === 'dummyjson' ? item.productDetails : item.productId
                            return (
                                <div key={item._id} className='bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300'>
                                    <div className='flex gap-6'>
                                        {/* Product Image */}
                                        <div className='w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 flex-shrink-0'>
                                            <img 
                                                src={product?.productImage?.[0]} 
                                                alt={product?.productName}
                                                className='w-full h-full object-scale-down'
                                            />
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <h3 className='text-lg font-semibold text-gray-800 line-clamp-2 pr-4'>
                                                    {product?.productName}
                                                </h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.productId)}
                                                    className='text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-300'
                                                    title='Remove item'
                                                >
                                                    <MdDelete size={20} />
                                                </button>
                                            </div>
                                            
                                            <p className='text-gray-600 capitalize mb-4'>
                                                {API_MODE === 'dummyjson' 
                                                    ? dummyJsonApi.getCategoryDisplayName(product?.category)
                                                    : product?.category
                                                }
                                            </p>
                                            
                                            {/* Price and Quantity */}
                                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                                <div className='space-y-1'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-xl font-bold text-primary-600'>
                                                            {displayINRCurrency(product?.sellingPrice)}
                                                        </span>
                                                        {product?.price !== product?.sellingPrice && (
                                                            <span className='text-sm text-gray-400 line-through'>
                                                                {displayINRCurrency(product?.price)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className='text-lg font-semibold text-gray-800'>
                                                        Total: {displayINRCurrency(product?.sellingPrice * item.quantity)}
                                                    </p>
                                                </div>
                                                
                                                {/* Quantity Controls */}
                                                <div className='flex items-center gap-3'>
                                                    <button 
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className='w-10 h-10 rounded-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300'
                                                    >
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className='text-lg font-semibold min-w-[2rem] text-center'>
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        className='w-10 h-10 rounded-full border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all duration-300'
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Order Summary */}
                {!loading && cartItems.length > 0 && (
                    <div className='xl:w-96'>
                        <div className='bg-white rounded-2xl shadow-card p-6 sticky top-4'>
                            <h2 className='text-xl font-bold text-gray-800 mb-6'>Order Summary</h2>
                            
                            <div className='space-y-4 mb-6'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-gray-600'>Items ({totalQty})</span>
                                    <span className='font-semibold'>{displayINRCurrency(totalPrice + totalSavings)}</span>
                                </div>
                                
                                {totalSavings > 0 && (
                                    <div className='flex justify-between items-center text-green-600'>
                                        <span>Savings</span>
                                        <span className='font-semibold'>-{displayINRCurrency(totalSavings)}</span>
                                    </div>
                                )}
                                
                                <div className='flex justify-between items-center text-gray-600'>
                                    <span>Shipping</span>
                                    <span className='font-semibold text-green-600'>FREE</span>
                                </div>
                                
                                <div className='border-t pt-4'>
                                    <div className='flex justify-between items-center text-lg font-bold'>
                                        <span>Total</span>
                                        <span className='text-primary-600'>{displayINRCurrency(totalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    toast.info('Checkout functionality will be implemented soon!')
                                }}
                                className='w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300'
                            >
                                Proceed to Checkout
                            </button>
                            
                            <button 
                                onClick={() => window.history.back()}
                                className='w-full mt-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white py-3 rounded-full font-semibold transition-all duration-300'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default Cart