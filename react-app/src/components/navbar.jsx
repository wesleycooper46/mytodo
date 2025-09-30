import '../index.css'
import { NavLink } from 'react-router-dom';

export default function Navbar () {
  return (
    <nav className='bg-blue-400 p-5 grid grid-cols-3 items-center'>
      <a href='' className='justify-self-start'><img src="/img/construction-and-tools.png" className='w-10 h-10' alt="" /></a>
      <ul className='flex gap-3 justify-center'>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/addtask">Add Task</NavLink>
        <NavLink to="/">Info</NavLink>
      </ul>
      <ul>
        <li></li>
    
      </ul>
    </nav>
  );
}