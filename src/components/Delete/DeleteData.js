import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { NavLink , Outlet } from 'react-router-dom';


export default function DeleteData() {
  const [delData, setDelData] = useState([]);
  const navigate = useNavigate();
  
  const handleLogout = (e) =>{
     e.preventDefault();
     navigate("/admin/login")
  }

  const handleClick = async (id) =>{
    
    const resp = await axios.delete(`http://localhost:4000/delete/${id}`);
    window.location.reload()
    
    
    // fetch(`http://localhost:4000/delete/${id}`, {
    //   method: 'DELETE'
    // });
    // const json = await resp.json();
    // if(resp.ok){
    //   setDelData(delData.filter(data => data._id !== id));
    // }
    console.log(resp);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch('http://localhost:4000/delete');
        const data = await resp.json();
        setDelData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className='del-main'>
       <nav className='upload'>
       <NavLink to="sports">Sports</NavLink>
       <NavLink to="events">Events</NavLink>
       <NavLink to="circulars">Circulars</NavLink>
       <NavLink to="placements">Placements</NavLink>
       <NavLink to="others">Others</NavLink>
       <button onClick={handleLogout}>Logout</button>
      </nav>

      {delData.map((data)=>(
        <div className='deldata' key={data._id}>
          <img src={data.dispUrl} alt="photo" width="300px" />
          <button onClick={() => handleClick(data._id)}>Delete</button>
        </div>
      ))}
      <Outlet/>
    </div>
    
  );
}
