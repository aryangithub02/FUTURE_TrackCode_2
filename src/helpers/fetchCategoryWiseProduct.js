import SummaryApi, { API_MODE } from "../common"
import dummyJsonApi from '../services/dummyJsonApi'

// Category mapping for DummyJSON compatibility
const categoryMapping = {
    // Your existing categories to DummyJSON categories
    "airpodes": "beauty", // temporary mapping - will show beauty products for airpods
    "watches": "mens-watches",
    "mobiles": "smartphones", 
    "Mouse": "laptops", // closest match
    "televisions": "laptops", // no exact match, using laptops
    "camera": "laptops", // no exact match
    "earphones": "beauty", // temporary
    "speakers": "beauty", // temporary
    "refrigerator": "furniture",
    "trimmers": "beauty"
};

const fetchCategoryWiseProduct = async(category) => {
    try {
        if (API_MODE === 'dummyjson') {
            // Map your category to DummyJSON category
            const dummyCategory = categoryMapping[category] || category;
            
            const response = await dummyJsonApi.getProductsByCategory(dummyCategory, 20);
            return {
                success: response.success,
                data: response.data,
                message: response.message || 'Products fetched successfully'
            };
        } else {
            // Original backend logic
            const response = await fetch(SummaryApi.categoryWiseProduct.url, {
                method: SummaryApi.categoryWiseProduct.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category })
            });

            const dataResponse = await response.json();
            return dataResponse;
        }
    } catch (error) {
        console.error('Error fetching category products:', error);
        return {
            success: false,
            message: error.message,
            data: []
        };
    }
}

export default fetchCategoryWiseProduct
