const backendDomin = "http://localhost:3000"

// Configuration for API mode - switch between 'backend' and 'dummyjson'
const API_MODE = 'dummyjson'; // Change this to 'backend' to use your original backend

const SummaryApi = {
    // Authentication & User Management (Backend only)
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    
    // Product Management (Admin only - Backend)
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    
    // Product APIs - Now using DummyJSON
    allProduct : {
        url : API_MODE === 'backend' ? `${backendDomin}/api/get-product` : 'https://dummyjson.com/products',
        method : 'get',
        source: API_MODE
    },
    categoryProduct : {
        url : API_MODE === 'backend' ? `${backendDomin}/api/get-categoryProduct` : 'https://dummyjson.com/products/categories',
        method : 'get',
        source: API_MODE
    },
    categoryWiseProduct : {
        url : API_MODE === 'backend' ? `${backendDomin}/api/category-product` : 'https://dummyjson.com/products/category',
        method : API_MODE === 'backend' ? 'post' : 'get',
        source: API_MODE
    },
    productDetails : {
        url : API_MODE === 'backend' ? `${backendDomin}/api/product-details` : 'https://dummyjson.com/products',
        method : API_MODE === 'backend' ? 'post' : 'get',
        source: API_MODE
    },
    searchProduct : {
        url : API_MODE === 'backend' ? `${backendDomin}/api/search` : 'https://dummyjson.com/products/search',
        method : 'get',
        source: API_MODE
    },
    filterProduct : {
        url : API_MODE === 'backend' ? `${backendDomin}/api/filter-product` : 'https://dummyjson.com/products/category',
        method : API_MODE === 'backend' ? 'post' : 'get',
        source: API_MODE
    },
    
    // Cart Management (Backend only - requires authentication)
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    }
}

// Export API mode for use in components
export { API_MODE };


export default SummaryApi