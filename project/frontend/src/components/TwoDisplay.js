import React from 'react'

export default function TwoDisplay({disp,currentIndex}) {
  return (
    <div className='two-grid'>
      <div className='first-box'>
        {disp[currentIndex]?.fileType === 'image' && (
          <img src={disp[currentIndex]?.dispUrl} alt='Image' width="100%" height="100%"/>
        )}
        {disp[currentIndex]?.fileType === 'video' && (
          <video autoPlay loop controls  width="100%" height="100%">
            <source src={disp[currentIndex]?.dispUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}
        
      </div>
      <div className='second-box'>
      <h2>{disp[currentIndex]?.text}</h2>
      </div>
    </div>
  )
}
