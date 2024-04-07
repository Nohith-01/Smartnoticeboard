import React, { useEffect, useState } from 'react';
import TwoDisplay from './TwoDisplay';
import SingleGrid from './SingleGrid';
import Marquee from './Marquee';

export default function Twogrid() {
  const [disp, setDisp] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flag, setFlag] = useState(false);
  const [sports, setSports] = useState(new Set());
  const [events, setEvents] = useState([]);
  const [others, setOthers] = useState([]);
  const [circulars,setCirculars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch('http://localhost:4000/');
        const data = await resp.json();
        setDisp(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % disp.length);
    }, disp[currentIndex]?.fileType === 'video' ? 3000 : 5000); // Change every 5s for images, 30s for videos

    setFlag(disp[currentIndex]?.text !== undefined && disp[currentIndex]?.text !== '');

    if (disp[currentIndex]?.category === "sports") {
      setSports((prevItems) => new Set([...prevItems, disp[currentIndex]]));
    } else if (disp[currentIndex]?.category === "events") {
      setEvents((prevEvents) => [...prevEvents, disp[currentIndex]]);
      
    } 
    else if (disp[currentIndex]?.category === "circulars") {
      setCirculars((prevEvents) => [...prevEvents, disp[currentIndex]]);
      
    } 
    else {
      setOthers((prevOthers) => [...prevOthers, disp[currentIndex]]);
    }

    return () => clearInterval(interval);
  }, [currentIndex, disp]);

  

  return (
    <div>
      {flag ? <TwoDisplay disp={disp} currentIndex={currentIndex} /> : <SingleGrid disp={disp} currentIndex={currentIndex} />}
      <Marquee />

    </div>
  );
}
