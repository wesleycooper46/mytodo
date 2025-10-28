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

    // ใช้ axios method post สำหรับส่งข้อมูล username, password เพื่อไปเทียบใน backend
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const { user_id, message } = res.data; // รับค่า userid เพื่อจะเก็บใน localstorage
      localStorage.setItem("user_id", user_id);// เก็บค่า userid ไว้ใน localstorage เพื่อเป็น markpoint ว่าเป็น user คนไหน
      alert(message);
      navigate("/Dashboard");
    } catch (err) {
      console.log("Login Error : ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-96px)] bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 w-[400px] max-w-[90vw]">
          <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-8">
            Login
          </h1>

          <form onSubmit={ClickLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl py-3 mt-4 shadow-md cursor-pointer"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:underline cursor-pointer font-semibold"
                >
                  Create one
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
