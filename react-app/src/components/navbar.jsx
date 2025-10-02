import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const LogoutClick = () => {
    localStorage.removeItem("user_id");
    const userid = Number(localStorage.getItem("user_id"));
    console.log("ID After Logout: ", userid);
    navigate("/");
  };

  return (
    <nav  className="bg-blue-400 p-5 grid grid-cols-5 items-center h-25">
      <a href="" className="justify-self-start">
        <img
          src="/img/construction-and-tools.png"
          className="w-10 h-10"
          alt=""
        />
      </a>
      <ul className="flex gap-4 justify-center col-span-3">
        <div className=" hover:bg-blue-500">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <NavLink to="/addtask">Add Task</NavLink>
        <NavLink to="/historytask">History</NavLink>
        <NavLink to="/">Chat</NavLink>
      </ul>
      <ul className="flex justify-center">
        <button
          onClick={LogoutClick}
          className="p-2 m-2 bg-red-500 rounded-2xl"
        >
          Logout
        </button>
      </ul>
    </nav>
  );
}
