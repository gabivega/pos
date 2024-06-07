import React, { useState} from 'react'
import CrossmasterBanner from "../assets/crossmaster-banner.jpg"
import CrossmasterBanner2 from "../assets/2.jpg"
import CrossmasterBanner3 from "../assets/3.jpg"
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'


const MiddleSectionSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const crossmasterImagesArray = [
    CrossmasterBanner,
    CrossmasterBanner2,
    CrossmasterBanner3
  ]
  const slideCrossmasterBannerLeft = () => {
    const isFirstSlide = currentSlideIndex === 0
    const newSlideIndex = isFirstSlide ? crossmasterImagesArray.length -1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newSlideIndex)
  }
  const slideCrossmasterBannerRight = () => {
    const isLastSlide = currentSlideIndex === crossmasterImagesArray.length -1
    const newSlideIndex = isLastSlide ? 0 : currentSlideIndex + 1
    setCurrentSlideIndex(newSlideIndex)
  }
  

  return (
    <div className='my-2  '>         
      <div className='flex items-center select-none '>        
        <MdChevronLeft 
          size={40} 
          className='cursor-pointer opacity-50 hover:opacity-100 z-2'
          onClick={slideCrossmasterBannerLeft}/>
        <div 
          className='w-full h-full max-h-250 '>           
            <img src={crossmasterImagesArray[currentSlideIndex]} className='object-cover w-full p-1 max-h-[400px]'/>
        </div>
        <MdChevronRight 
          size={40}
          className='cursor-pointer opacity-50 hover:opacity-100 z-2'
          onClick={slideCrossmasterBannerRight} />
      </div>
  </div>
  )
}

export default MiddleSectionSlider