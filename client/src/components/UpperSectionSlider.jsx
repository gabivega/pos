import React, { useState} from 'react'
import Boltsbanner from "../assets/bolts-banner.jpg"
import CabezalesBanner from "../assets/banner-cabezales.JPG"
import TramontinaBanner from "../assets/tramontina-banner.JPG"
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'

const UpperSectionSlider = () => {

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const imagesArray = [
    Boltsbanner,
    CabezalesBanner,
    TramontinaBanner
    
  ]
  const slideLeft = () => {
    const isFirstSlide = currentSlideIndex === 0
    const newSlideIndex = isFirstSlide ? imagesArray.length -1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newSlideIndex)
  }
  const slideRight = () => {
    const isLastSlide = currentSlideIndex === imagesArray.length -1
    const newSlideIndex = isLastSlide ? 0 : currentSlideIndex + 1
    setCurrentSlideIndex(newSlideIndex)
  }

  return (
    <div className=' '>        
      <div className='select-none relative m-auto w-full group'>        
        <div 
          className='w-full h-full max-h-300 flex justify-center'>           
            <img src= {imagesArray[currentSlideIndex]}
            className='object-cover w-full max-h-[300px]'/>
        </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2
         bg-black/20 text-white cursor-pointer'>        
          <MdChevronLeft 
            size={40}             
            onClick={slideLeft}/>
          </div>
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2
         bg-black/20 text-white cursor-pointer'>
          <MdChevronRight 
            size={40}            
            onClick={slideRight} />
        </div>
      </div>
  </div>
  )
}

export default UpperSectionSlider