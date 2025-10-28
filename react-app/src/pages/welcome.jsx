import "../index.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-96px)] bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl w-[500px] max-w-[90vw] p-10 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
            Welcome
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Task Management Website
          </h2>
          <p className="text-gray-600 mb-8">
            Please <span className="font-semibold">Login</span> or{" "}
            <span className="font-semibold">Register</span> to continue.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-xl px-6 py-2 shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-200 hover:bg-gray-300 transition text-gray-800 font-semibold rounded-xl px-6 py-2 shadow-md"
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
