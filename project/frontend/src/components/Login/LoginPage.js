import React from 'react'
import { NavLink , Outlet } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='upload'>
       <nav>
          <NavLink to="register">Register</NavLink>
          <NavLink to="login">Login</NavLink>
       </nav>

       <Outlet />
    </div>

  )
}
