import "../index.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="text-center border-2 rounded-2xl w-[500px] p-6">
          <div className="m-4">
            <h1 className="text-3xl font-bold">
              Hi Welcome to Todo List Website
            </h1>
            <h3 className="text-lg">Please Login/ Register to use Website</h3>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              className="p-2 border-2 rounded-2xl hover:bg-blue-400"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="p-2 border-2 rounded-2xl hover:bg-blue-400"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
