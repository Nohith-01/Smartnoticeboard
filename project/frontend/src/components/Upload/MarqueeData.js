import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function MarqueeData() {
  const [first , setFirst] = useState("");
  const [second , setSecond] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleSubmit = async (event) =>{
     event.preventDefault();
     const response = await axios.post('https://college-web-platform-backend-code.onrender.com/upload',{first,second,endDate});
     console.log(response);
  }
  return (
    <div className='register-form'>
       <form onSubmit={handleSubmit}>

        <label>Select end date:</label>
        <input 
         className='endDate'
         type='date'
         onChange={(e)=>setEndDate(e.target.value)}
         value={endDate}
        
        />
        <br />
          <label>Enter data for first scroll:</label>
          <input 
            type='textarea'
            onChange={(e)=>setFirst(e.target.value)}
            required

          />
          <label>Enter data for second scroll:</label>
          <input 
            type='textarea'
            onChange={(e)=>setSecond(e.target.value)}
            required

          />
          <button>Upload</button>
       </form>
    </div>
  )
}
