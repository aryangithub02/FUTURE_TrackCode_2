import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi, { API_MODE } from '../common'
import VerticalCard from '../components/VerticalCard'
import dummyJsonApi from '../services/dummyJsonApi'

const SearchProduct = () => {
    const location = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Extract search query from URL
    const urlParams = new URLSearchParams(location.search)
    const queryParam = urlParams.get('q') || ''

    const fetchProduct = async()=>{
        if (!queryParam) return
        
        setLoading(true)
        try {
            if (API_MODE === 'dummyjson') {
                const response = await dummyJsonApi.searchProducts(queryParam, 50)
                if (response.success) {
                    setData(response.data)
                } else {
                    setData([])
                }
            } else {
                const response = await fetch(SummaryApi.searchProduct.url + location.search)
                const dataResponse = await response.json()
                setData(dataResponse.data)
            }
        } catch (error) {
            console.error('Search error:', error)
            setData([])
        } finally {
            setLoading(false)
        }
        setSearchQuery(queryParam)
    }

    useEffect(()=>{
        fetchProduct()
    },[location.search, queryParam])

  return (
    <div className='container mx-auto p-4 min-h-screen'>
      {
        loading && (
          <div className='flex justify-center items-center py-20'>
            <div className='text-center'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600'></div>
              <p className='text-lg text-gray-600 mt-4'>Searching products...</p>
            </div>
          </div>
        )
      }

      {!loading && (
        <>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2'>
              Search Results
            </h1>
            {searchQuery && (
              <p className='text-gray-600 text-lg'>
                Showing results for: <span className='font-semibold text-primary-600'>"{searchQuery}"</span>
              </p>
            )}
            <p className='text-gray-500 mt-2'>{data.length} product(s) found</p>
          </div>

          {
            data.length === 0 && !loading && (
              <div className='bg-white rounded-2xl shadow-card p-12 text-center'>
                <div className='text-6xl mb-4'>🔍</div>
                <h2 className='text-2xl font-semibold text-gray-800 mb-2'>No products found</h2>
                <p className='text-gray-600'>Try different keywords or browse our categories</p>
              </div>
            )
          }

          {
            data.length !== 0 && !loading && (
              <VerticalCard loading={loading} data={data}/>
            )
          }
        </>
      )}

    </div>
  )
}

export default SearchProduct