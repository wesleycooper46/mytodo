import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  // const userid = localStorage.getItem("user_id");

  // if (!userid) {
  //   alert("Please Login before Enter Website");
  //   navigate("/");
  // }
  // const HandleNavWithOutLogin = () => {
  //   if (!userid) {
  //   alert("Please Login before Enter Website");
  //   navigate("/");
  // }
  // }

  const LogoutClick = () => {
    localStorage.removeItem("user_id");
    const userid = Number(localStorage.getItem("user_id"));
    console.log("ID After Logout: ", userid);
    navigate("/");
  };

  return (
    <nav  className="bg-blue-400 p-5 grid grid-cols-3 items-center">
      <a href="" className="justify-self-start">
        <img
          src="/img/construction-and-tools.png"
          className="w-10 h-10"
          alt=""
        />
      </a>
      <ul className="flex gap-3 justify-center">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/addtask">Add Task</NavLink>
        <NavLink to="/">Chat</NavLink>
      </ul>
      <ul>
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
