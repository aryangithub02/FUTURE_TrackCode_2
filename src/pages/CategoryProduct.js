// CategoryProduct.js - FINAL BULLETPROOF VERSION
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// BULLETPROOF VERTICALCARD COMPONENT - INLINE TO AVOID IMPORT ISSUES
const VerticalCard = ({ data }) => {
  // ULTIMATE SAFETY CHECKS
  console.log('VerticalCard received:', data, 'Type:', typeof data, 'IsArray:', Array.isArray(data));
  
  // Handle all possible undefined/null/invalid cases
  if (data === undefined || data === null) {
    return <div className="text-center text-gray-500 p-8">No data provided</div>;
  }
  
  if (!Array.isArray(data)) {
    return <div className="text-center text-red-500 p-8">Data must be an array</div>;
  }
  
  if (data.length === 0) {
    return <div className="text-center text-gray-500 p-8">No products available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product, index) => {
        // Handle each product safely
        if (!product || typeof product !== 'object') {
          console.warn(`Invalid product at index ${index}:`, product);
          return null;
        }

        // Safe destructuring with comprehensive defaults
        const safeProduct = {
          id: product.id || index,
          title: product.title || 'Untitled Product',
          price: typeof product.price === 'number' ? product.price : 0,
          thumbnail: product.thumbnail || 'https://via.placeholder.com/300x300?text=No+Image',
          category: product.category || 'uncategorized',
          description: product.description || 'No description available',
          rating: typeof product.rating === 'number' ? product.rating : 0,
          brand: product.brand || '',
          discountPercentage: typeof product.discountPercentage === 'number' ? product.discountPercentage : 0,
          stock: typeof product.stock === 'number' ? product.stock : 0
        };

        const discountedPrice = safeProduct.discountPercentage > 0 
          ? (safeProduct.price * (1 - safeProduct.discountPercentage / 100))
          : safeProduct.price;

        return (
          <div key={`product-${safeProduct.id}-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={safeProduct.thumbnail}
                alt={safeProduct.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
                loading="lazy"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]" title={safeProduct.title}>
                {safeProduct.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-2 capitalize">
                {safeProduct.category.replace(/-/g, ' ')}
              </p>
              
              {safeProduct.brand && (
                <p className="text-gray-500 text-sm mb-2">
                  {safeProduct.brand}
                </p>
              )}
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                {safeProduct.description}
              </p>
              
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  {safeProduct.discountPercentage > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${safeProduct.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-green-600">
                      ${safeProduct.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {safeProduct.rating > 0 && (
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-700 text-sm font-medium">
                      {safeProduct.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {safeProduct.discountPercentage > 0 && (
                <div className="mb-3">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                    {safeProduct.discountPercentage.toFixed(0)}% OFF
                  </span>
                </div>
              )}

              <div className="text-sm text-gray-600 mb-3">
                {safeProduct.stock > 0 ? (
                  <span className="text-green-600">✓ In Stock ({safeProduct.stock})</span>
                ) : (
                  <span className="text-red-600">✗ Out of Stock</span>
                )}
              </div>
              
              <button 
                className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  safeProduct.stock > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={safeProduct.stock === 0}
              >
                {safeProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// MAIN CATEGORY PRODUCT COMPONENT
const CategoryProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch all products once
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      if (data && Array.isArray(data.products)) {
        console.log('Products loaded:', data.products.length);
        setAllProducts(data.products);
        
        // Extract unique categories
        const categories = [...new Set(data.products.map(p => p.category))].filter(Boolean);
        console.log('Categories extracted:', categories);
        setAllCategories(categories);
        
        // Initial filter
        filterProducts(data.products, {});
      } else {
        throw new Error('Invalid data format from API');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setAllProducts([]);
      setFilteredProducts([]);
      setAllCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on selected categories
  const filterProducts = (products, categories) => {
    console.log('Filtering products:', products.length, 'Categories:', categories);
    
    const selectedCats = Object.keys(categories).filter(key => categories[key]);
    
    let filtered = products;
    if (selectedCats.length > 0) {
      filtered = products.filter(product => 
        product && product.category && selectedCats.includes(product.category)
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const priceA = typeof a.price === 'number' ? a.price : 0;
        const priceB = typeof b.price === 'number' ? b.price : 0;
        return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    console.log('Filtered result:', filtered.length);
    setFilteredProducts(filtered);
  };

  // Parse URL on mount and location change
  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const urlCategories = urlSearch.getAll('category');
    const categoryObj = {};
    urlCategories.forEach(cat => {
      if (cat && typeof cat === 'string') {
        categoryObj[cat] = true;
      }
    });
    console.log('URL categories parsed:', categoryObj);
    setSelectedCategories(categoryObj);
  }, [location.search]);

  // Filter when categories or sort changes
  useEffect(() => {
    if (allProducts.length > 0) {
      filterProducts(allProducts, selectedCategories);
      
      // Update URL
      const selectedList = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
      const query = selectedList.map(c => `category=${encodeURIComponent(c)}`).join('&');
      navigate(`/product-category${query ? '?' + query : ''}`, { replace: true });
    }
  }, [selectedCategories, sortBy, allProducts, navigate]);

  // Load data on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Event handlers
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    console.log('Category changed:', value, checked);
    setSelectedCategories(prev => ({ ...prev, [value]: checked }));
  };

  const handleSortChange = (e) => {
    console.log('Sort changed:', e.target.value);
    setSortBy(e.target.value);
  };

  const clearAllFilters = () => {
    console.log('Clearing all filters');
    setSelectedCategories({});
    setSortBy('');
  };

  const selectedCategoryCount = Object.values(selectedCategories).filter(Boolean).length;

  // ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Products</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAllProducts}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h1>
          <p className="text-gray-600">
            {selectedCategoryCount === 0 
              ? `Browse all ${allProducts.length} products` 
              : `Showing products from ${selectedCategoryCount} selected ${selectedCategoryCount === 1 ? 'category' : 'categories'}`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-6">
            {/* Sort Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                Sort by Price
              </h3>
              <div className="space-y-3">
                {[
                  { value: '', label: 'Default' },
                  { value: 'asc', label: 'Price: Low to High' },
                  { value: 'desc', label: 'Price: High to Low' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={handleSortChange}
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                Categories ({selectedCategoryCount} selected)
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {allCategories.map((category, index) => {
                  const categoryStr = String(category || `category-${index}`);
                  return (
                    <label key={categoryStr} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        value={categoryStr}
                        checked={!!selectedCategories[categoryStr]}
                        onChange={handleCategoryChange}
                        className="text-blue-600 rounded"
                      />
                      <span className="text-gray-700 capitalize text-sm">
                        {categoryStr.replace(/-/g, ' ')}
                      </span>
                    </label>
                  );
                })}
              </div>
              
              {selectedCategoryCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded border border-blue-200 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Results Header */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {loading ? 'Loading...' : `${filteredProducts.length} Products Found`}
                </h2>
                {selectedCategoryCount > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(selectedCategories)
                      .filter(key => selectedCategories[key])
                      .map(category => (
                      <span key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                        {String(category).replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-white rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500 text-lg">Loading products...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-16 text-center">
                <div className="text-gray-400 text-8xl mb-6">🛍️</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No products found</h3>
                <p className="text-gray-500 mb-6 text-lg">
                  {selectedCategoryCount > 0 
                    ? 'Try selecting different categories or clearing filters.'
                    : 'No products available at the moment.'
                  }
                </p>
                {selectedCategoryCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg">
                <VerticalCard data={filteredProducts} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;