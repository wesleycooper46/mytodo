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

  const ClickCreate = async (e) => {
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
      <div>
        <div>
          <h1>Create Account</h1>
          <form onSubmit={ClickCreate}>
            <label htmlFor="firstname">First Name: </label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <label htmlFor="lastname">Last Name: </label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />

            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmpassword">Confirm your Password</label>
            <input
              id="confirmpassword"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />

            <button
              className="border-2 rounded-2xl pt-1 pl-2 pr-2 pb-1 m-2 hover:cursor-pointer"
              type="submit"
            >
              {" "}
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
