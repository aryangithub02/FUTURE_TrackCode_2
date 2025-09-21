const DUMMY_JSON_BASE_URL = "https://dummyjson.com";

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class DummyJsonApi {
  // Helper method for caching
  getCacheKey(url, params) {
    return `${url}${params ? JSON.stringify(params) : ''}`;
  }

  isValidCache(timestamp) {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  // Generic fetch method with caching
  async fetchWithCache(endpoint, options = {}) {
    const cacheKey = this.getCacheKey(endpoint, options);
    
    // Check cache first
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (this.isValidCache(cached.timestamp)) {
        return cached.data;
      }
      cache.delete(cacheKey);
    }

    try {
      const response = await fetch(`${DUMMY_JSON_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Cache the response
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Transform DummyJSON product to match your existing format
  transformProduct(product) {
    return {
      _id: product.id.toString(),
      productName: product.title,
      brandName: product.brand || 'Generic',
      category: product.category,
      productImage: product.images || [product.thumbnail],
      description: product.description,
      price: product.price,
      sellingPrice: product.price - ((product.price * product.discountPercentage) / 100),
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviews || [],
      tags: product.tags || [],
      dimensions: product.dimensions,
      weight: product.weight,
      warranty: product.warrantyInformation,
      shipping: product.shippingInformation,
      availability: product.availabilityStatus,
      returnPolicy: product.returnPolicy,
      minimumOrder: product.minimumOrderQuantity || 1,
      sku: product.sku,
      discountPercentage: product.discountPercentage
    };
  }

  // Get all products with pagination
  async getAllProducts(limit = 30, skip = 0) {
    try {
      const data = await this.fetchWithCache(`/products?limit=${limit}&skip=${skip}`);
      return {
        success: true,
        data: data.products.map(product => this.transformProduct(product)),
        total: data.total,
        skip: data.skip,
        limit: data.limit
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  // Get single product by ID
  async getProductById(id) {
    try {
      const product = await this.fetchWithCache(`/products/${id}`);
      return {
        success: true,
        data: this.transformProduct(product)
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  // Get products by category
  async getProductsByCategory(category, limit = 30) {
    try {
      const data = await this.fetchWithCache(`/products/category/${category}?limit=${limit}`);
      return {
        success: true,
        data: data.products.map(product => this.transformProduct(product))
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  // Search products
  async searchProducts(query, limit = 30) {
    try {
      const data = await this.fetchWithCache(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      return {
        success: true,
        data: data.products.map(product => this.transformProduct(product))
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const categories = await this.fetchWithCache('/products/categories');
      
      // Create category objects with images from first product of each category
      const categoryData = [];
      
      for (const category of categories) {
        try {
          const categoryProducts = await this.getProductsByCategory(category, 1);
          if (categoryProducts.success && categoryProducts.data.length > 0) {
            categoryData.push({
              category: category,
              productImage: categoryProducts.data[0].productImage
            });
          }
        } catch (error) {
          // If we can't get category image, still include the category
          categoryData.push({
            category: category,
            productImage: ['/placeholder-image.jpg']
          });
        }
      }
      
      return {
        success: true,
        data: categoryData
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: []
      };
    }
  }

  // Category mapping for better display names
  getCategoryDisplayName(category) {
    const categoryMap = {
      'beauty': 'Beauty & Personal Care',
      'fragrances': 'Fragrances & Perfumes', 
      'furniture': 'Home & Furniture',
      'groceries': 'Groceries & Food',
      'home-decoration': 'Home Decoration',
      'kitchen-accessories': 'Kitchen Accessories',
      'laptops': 'Laptops & Computers',
      'mens-shirts': "Men's Shirts",
      'mens-shoes': "Men's Shoes",
      'mens-watches': "Men's Watches",
      'mobile-accessories': 'Mobile Accessories',
      'motorcycle': 'Motorcycles',
      'skin-care': 'Skin Care',
      'smartphones': 'Smartphones',
      'sports-accessories': 'Sports Accessories',
      'sunglasses': 'Sunglasses',
      'tablets': 'Tablets',
      'tops': "Women's Tops",
      'vehicle': 'Vehicles',
      'womens-bags': "Women's Bags",
      'womens-dresses': "Women's Dresses",
      'womens-jewellery': "Women's Jewellery",
      'womens-shoes': "Women's Shoes",
      'womens-watches': "Women's Watches"
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  }
}

// Create singleton instance
const dummyJsonApi = new DummyJsonApi();
export default dummyJsonApi;
