import {useState , useEffect} from 'react';

const useTime = () => {
  
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      //console.log(date);
      //console.log(date.getMinutes())
      setMinutes(date.getMinutes());
      setHours(date.getHours());
      setSeconds(date.getSeconds());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return {hours,minutes,seconds};
}
 
export default useTime;