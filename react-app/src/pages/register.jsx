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

  const ClickCreateAccount = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !username || !email || !password) {
      alert("Please Complete the Box");
      return;
    }

    if (password !== confirmpassword) {
      alert("Password do not match");
      return;
    }

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
      <div className="flex justify-center items-center min-h-screen bg-[#ede8f5]">
        <div className="w-[700px] max-w-[92vw] border-[#ADBBDA] rounded-2xl p-6 bg-white">
          <div className="pb-6">
            <h1 className="font-bold text-2xl">Create Account</h1>
          </div>

          <form className="m-2" onSubmit={ClickCreateAccount}>
            <div className="grid grid-cols-[100px_1fr_80px_1fr] gap-8 mb-4">
              <label htmlFor="firstname">First Name: </label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                placeholder="Enter your first name"
                onChange={(e) => setFirstname(e.target.value)}
              />

              <label htmlFor="lastname">Last Name: </label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                placeholder="Enter your last name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <label htmlFor="username" className="w-[200px]">Username: </label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="confirmpassword">Confirm your Password</label>
              <input
                id="confirmpassword"
                type="password"
                value={confirmpassword}
                placeholder="Re-enter your password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            <button
              className="border-2 rounded-2xl pt-1 pl-2 pr-2 pb-1 m-2 hover:cursor-pointer"
              type="submit"
            >
              {" "}
              Create Account
            </button>
            <div className="hover:text-blue-600 cursor-pointer" onClick={() => {navigate("/login")}}>
              already have account?
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
