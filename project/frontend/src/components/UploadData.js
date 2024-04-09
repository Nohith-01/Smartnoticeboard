import React from 'react'
import {NavLink , Outlet } from 'react-router-dom'

export default function UploadData() {
  return (
    <div>
      <nav className='upload'>
       <NavLink to="sports">Sports</NavLink>
       <NavLink to="events">Events</NavLink>
       <NavLink to="circulars">Circulars</NavLink>
       <NavLink to="placements">Placements</NavLink>
       <NavLink to="marquee">ScrollData</NavLink>
       <NavLink to="others">Others</NavLink>
       
       
      </nav>
      
       


       <Outlet />
    </div>
    
    
  )
}
