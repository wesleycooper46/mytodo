import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/img/img";

export default function Navbar() {
  const navigate = useNavigate();
  const userid = localStorage.getItem("user_id");

  const LogoutClick = () => {
    localStorage.removeItem("user_id");
    const userid = Number(localStorage.getItem("user_id"));
    console.log("ID After Logout: ", userid);
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 p-5 grid grid-cols-5 items-center h-24 shadow-md">
      <a href="" className="justify-self-start flex items-center gap-2">
        <img src={assets.weblogo} className="w-10 h-10 rounded-full" alt="" />
        <span className="text-white font-semibold text-xl">Task Manager</span>
      </a>

      <ul className="flex gap-6 justify-center col-span-3 text-white font-medium">
        <li className="hover:text-yellow-200 transition">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li className="hover:text-yellow-200 transition">
          <NavLink to="/addtask">Add Task</NavLink>
        </li>
        <li className="hover:text-yellow-200 transition">
          <NavLink to="/historytask">History</NavLink>
        </li>
        <li className="hover:text-yellow-200 transition">
          <NavLink to={`/chatbot/${userid}`}>Chat</NavLink>
        </li>
      </ul>

      <ul className="flex justify-center">
        <button
          onClick={LogoutClick}
          className="p-2 m-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl cursor-pointer transition shadow-sm"
        >
          Logout
        </button>
      </ul>
    </nav>
  );
}
