import { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  // ฟังชันสำหรับสร้างบัญชีใหม่
  const ClickCreateAccount = async (e) => {
    e.preventDefault();

    // เช็คหลังกด submit ว่ากรอกข้อมูลครบทุกช่อง
    if (!firstname || !lastname || !username || !email || !password) {
      alert("Please complete all fields");
      return;
    }

    // เช็คว่า password กับ confirmpassword ว่าตรงหรือไม่
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    // ใช้ method post สำหรับ insert ข้อมูลบัญชีไป database
    try {
      const res = await axios.post("http://localhost:5000/register", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      console.log(res.data.message); 
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-96px)] bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <div className="w-[700px] max-w-[90vw] bg-white shadow-xl rounded-2xl p-10 border border-[#d1d5db]">
          <h1 className="font-extrabold text-3xl text-center text-blue-700 mb-8">
            Create Account
          </h1>

          <form className="space-y-6" onSubmit={ClickCreateAccount}>
            {/* Firstname & Lastname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstname"
                  className="block font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  placeholder="Enter your last name"
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmpassword"
                className="block font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                type="password"
                value={confirmpassword}
                placeholder="Re-enter your password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl py-3 mt-4 shadow-md cursor-pointer"
            >
              Create Account
            </button>

            {/* Login Redirect */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline cursor-pointer font-semibold"
                >
                  Log in
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
