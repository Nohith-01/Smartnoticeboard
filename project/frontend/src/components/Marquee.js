import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Marquee() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://college-web-platform-backend-code.onrender.com/upload');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="scroll">
      {data.length > 0 && (
        <>
          <marquee bgcolor="blue" className="nrmltext second" scrollamount="10">{data[0].first}</marquee>
          <marquee bgcolor="1B9AAA" className="nrmltext temp" scrollamount="5">{data[0].second}</marquee>
        </>
      )}
    </div>
  );
}
