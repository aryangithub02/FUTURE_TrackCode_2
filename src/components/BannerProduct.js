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
    <div className='container mx-auto px-4 rounded '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

            <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={preveImage} className='bg-backgroundCard/80 backdrop-blur-sm shadow-lg rounded-full p-3 border border-primary hover:border-primary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-110 hover:shadow-glow'><FaAngleLeft className='text-primary'/></button>
                    <button onClick={nextImage} className='bg-backgroundCard/80 backdrop-blur-sm shadow-lg rounded-full p-3 border border-primary hover:border-primary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-110 hover:shadow-glow'><FaAngleRight className='text-primary'/></button>
                </div>
            </div>

            {/* desktop and tablet version */}
            <div className='hidden md:flex h-full w-full overflow-hidden relative z-10'>
                {
                    desktopImages.map((imageURl,index)=>{
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all duration-700 ease-in-out relative' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover opacity-90'/>
                                {/* Content Overlay */}
                                <div className='absolute inset-0 flex items-center justify-start pl-16'>
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* mobile version */}
            <div className='flex h-full w-full overflow-hidden md:hidden relative z-10'>
                {
                    mobileImages.map((imageURl,index)=>{
                        return(
                            <div className='w-full h-full min-w-full min-h-full transition-all duration-700 ease-in-out relative' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover opacity-90'/>
                                {/* Mobile Content Overlay */}
                                <div className='absolute inset-0 flex items-end justify-center pb-8'>
                                    <div className='text-textPrimary text-center px-4 animate-fade-in bg-backgroundCard/40 backdrop-blur-sm rounded-xl p-4 mx-4 border border-secondary'>
                                        <h2 className='text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent hover:animate-neon-pulse'>Enter 999 Store</h2>
                                        <p className='text-sm mb-4 text-textSecondary'>Wireless at ₹999</p>
                                        <button className='bg-secondary border border-primary text-primary hover:bg-primary hover:text-backgroundMain px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300'>Shop Now</button>
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
                                ? 'bg-primary shadow-lg shadow-primary/30' 
                                : 'bg-secondary hover:bg-primary/50'
                        }`}
                    />
                ))}
            </div>

        </div>
    </div>
  )
}

export default BannerProduct