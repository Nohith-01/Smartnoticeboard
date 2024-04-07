import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Other() {

  const navigate = useNavigate();
  const [delData , setDelData] = useState(null);
  const handleClick = async (id) =>{
    
     const resp = await axios.delete(`http://localhost:4000/delete/others/${id}`);
     navigate('/delete')
    
     console.log(resp);
    console.log("Deleted");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch('http://localhost:4000/delete/others');
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
    <div>
      {delData && delData.map((data)=>(
        <div className='deldata' key={data._id}>
          <img src={data.dispUrl} alt="photo" width="300px" />
          <button onClick={() => handleClick(data._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
