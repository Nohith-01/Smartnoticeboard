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
    
    const resp = await axios.delete(`https://college-web-platform-backend-code.onrender.com/delete/${id}`);
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
        const resp = await fetch('https://college-web-platform-backend-code.onrender.com/delete');
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
        <div className="deldata w-[300px] rounded-md border" key={data._id}>
        {data.fileType === 'video' ? (
            <video controls width="400px">
              <source src={data.dispUrl} type="video/mp4" className="h-[200px] w-full rounded-t-md object-cover" />
            </video>
          ) : (
            <img src={data.dispUrl} alt="photo" width="400px" className="h-[200px] w-full rounded-t-md object-cover"/>
          )}
        <div className="p-4">
          <h2>End Date:</h2>
          <h3 className="inline-flex items-center text-lg font-semibold">
            {data.endDate}
          </h3>
          <p className="mt-3 text-sm text-gray-600">
            text : {data.text}
          </p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              <h3>File type:</h3>{data.fileType}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              <h3>Category:</h3>{data.category}
            </span>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "onClick={() => handleClick(data._id)}
          >
            Delete
          </button>
        </div>
      </div>      
      ))}
      <Outlet/>
    </div>
    
  );
}
