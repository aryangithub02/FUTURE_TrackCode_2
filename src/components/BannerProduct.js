import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }


    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4 mb-12'>
        <div className='h-64 md:h-96 w-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative rounded-2xl overflow-hidden shadow-2xl'>
            {/* Decorative elements */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl'></div>
                <div className='absolute bottom-10 left-10 w-24 h-24 bg-secondary-400/20 rounded-full blur-lg'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl'></div>
            </div>

                <div className='absolute z-20 h-full w-full md:flex items-center hidden px-8'>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white/20 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white/30 transition-all duration-300 transform hover:scale-110'><FaAngleLeft className='text-white'/></button>
                        <button onClick={nextImage} className='bg-white/20 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white/30 transition-all duration-300 transform hover:scale-110'><FaAngleRight className='text-white'/></button> 
                    </div>
                </div>

                {/**desktop and tablet version */}
              <div className='hidden md:flex h-full w-full overflow-hidden relative z-10'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all duration-700 ease-in-out relative' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover opacity-80'/>
                                <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent'></div>
                                {/* Content Overlay */}
                                <div className='absolute inset-0 flex items-center justify-start pl-16'>
                                    <div className='text-white max-w-lg animate-fade-in'>
                                        <h1 className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>Discover Amazing Products</h1>
                                        <p className='text-xl md:text-2xl mb-8 opacity-90'>Find the best deals on premium electronics</p>
                                        <button className='bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300'>Shop Now</button>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                }
              </div>


                {/**mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden relative z-10'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all duration-700 ease-in-out relative' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover opacity-80'/>
                                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
                                {/* Mobile Content Overlay */}
                                <div className='absolute inset-0 flex items-end justify-center pb-8'>
                                    <div className='text-white text-center px-4 animate-fade-in'>
                                        <h2 className='text-2xl font-bold mb-2'>Amazing Products</h2>
                                        <p className='text-sm mb-4 opacity-90'>Best deals on electronics</p>
                                        <button className='bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg'>Shop Now</button>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                }
              </div>

                {/* Navigation Dots */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2'>
                    {desktopImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentImage === index 
                                    ? 'bg-white shadow-lg' 
                                    : 'bg-white/50 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>

        </div>
    </div>
  )
}

export default BannerProduct