import React, { useEffect, useState } from 'react'
import SummaryApi, { API_MODE } from '../common'
import { Link } from 'react-router-dom'
import dummyJsonApi from '../services/dummyJsonApi'

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() => {
        setLoading(true)
        try {
            if (API_MODE === 'dummyjson') {
                const response = await dummyJsonApi.getCategories()
                if (response.success) {
                    setCategoryProduct(response.data.slice(0, 12)) // Limit to first 12 categories
                }
            } else {
                const response = await fetch(SummaryApi.categoryProduct.url)
                const dataResponse = await response.json()
                setCategoryProduct(dataResponse.data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4 pt-8'>
           <div className='flex items-center gap-6 justify-center overflow-x-auto scrollbar-none pb-4'>
            {

                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='flex-shrink-0' key={"categoryLoading"+index}>
                                    <div className='h-20 w-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse shadow-lg'>
                                    </div>
                                    <div className='w-16 h-4 bg-gray-200 animate-pulse rounded mt-2 mx-auto'></div>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='flex-shrink-0 group cursor-pointer' key={product?.category}>
                                <div className='w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden p-4 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply group-hover:scale-110 transition-all duration-300'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize mt-2 font-semibold text-gray-700 group-hover:text-primary-600 transition-colors duration-300'>
                                    {API_MODE === 'dummyjson' ? dummyJsonApi.getCategoryDisplayName(product?.category) : product?.category}
                                </p>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default CategoryList