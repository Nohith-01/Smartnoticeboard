
import useTime from '../hooks/useTime';
import chairman from '../images/chairman.jpg'
import college from '../images/college_pic.jpeg.jpg';
import logo from '../images/Logo.jpg';

export default function Navbar() {
  
  const {hours,minutes,seconds} = useTime();

  return (
    <nav>
      <img src={chairman} height="180px"  className="chairman" alt='chairman sir photo'></img>
      <img src={logo} width="100%" height="180px" alt='College logo'></img>
      
      <img  src={college} height="180px" className='college' alt='college photo'></img>

    </nav>
  );
}
