import Navbar from "../components/navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ClickLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const { user_id, message } = res.data;
      console.log("data : ", message);
      localStorage.setItem("user_id", user_id);
      console.log("User Id: ", user_id);
      alert(message);
      navigate("/Dashboard");
    } catch (err) {
      console.log("Login Error : ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen items-center">
        <div className="border-2 p-6 rounded-2xl w-[450px] ">
          <h1 className="mb-4 ml-4 text-3xl font-bold"> Login </h1>
          <form className="ml-4" onSubmit={ClickLogin}>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <label htmlFor="username"> Username : </label>
              <input
                type="text"
                value={username}
                name="username"
                className="border-2"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="password"> Password : </label>
              <input
                type="password"
                value={password}
                name="password"
                className="border-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-center items-baseline gap-3">
              <button
                className="border-2 rounded-2xl pt-1 pl-2 pr-2 pb-1 mt-4 hover:cursor-pointer hover:bg-blue-400"
                type="submit"
              >
                Login
              </button>

              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate("/register")}
              >
                Create an Accout!
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
