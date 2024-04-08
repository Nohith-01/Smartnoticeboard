import React from 'react'

export default function SingleGrid({disp , currentIndex}) {
  return (
    <div className='single-box'>
       <div className='first-box'>
        {disp[currentIndex]?.fileType === 'image' && (
          <img src={disp[currentIndex]?.dispUrl} alt='Image' width="100%" height="100%"/>
        )}
        </div>
    </div>
  )
}
