import SummaryApi, { API_MODE } from "../common"
import { toast } from 'react-toastify'

const addToCart = async(e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    try {
        if (API_MODE === 'dummyjson') {
            // In DummyJSON mode, we'll simulate adding to cart using localStorage
            // since DummyJSON doesn't have cart functionality
            
            let cart = JSON.parse(localStorage.getItem('dummyCart') || '[]');
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.productId === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                toast.success('Product quantity updated in cart!');
            } else {
                cart.push({
                    productId: id,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                });
                toast.success('Product added to cart!');
            }
            
            localStorage.setItem('dummyCart', JSON.stringify(cart));
            
            // Dispatch custom event to update cart count
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
            
            return {
                success: true,
                message: 'Product added to cart',
                data: cart
            };
            
        } else {
            // Original backend logic
            const response = await fetch(SummaryApi.addToCartProduct.url, {
                method: SummaryApi.addToCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ productId: id })
            });

            const responseData = await response.json();

            if (responseData.success) {
                toast.success(responseData.message);
            }

            if (responseData.error) {
                toast.error(responseData.message);
            }

            return responseData;
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product to cart');
        return {
            success: false,
            message: error.message
        };
    }
}


export default addToCart