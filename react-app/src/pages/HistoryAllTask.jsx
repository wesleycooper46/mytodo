import "../index.css";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const HistoryTask = () => {
  const [task, setTask] = useState([]);
  const userid = localStorage.getItem("user_id");

  // fetch task ที่มีสถานะ done แล้ว
  useEffect(() => {
    const FetchDoneTask = async () => {
      try {
        const res = await axios.get("http://localhost:5000/alldonetask", {
          params: { userid },
        });
        setTask(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    FetchDoneTask();
  }, [userid]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-96px)] bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
            Task History
          </h1>

          {task.length > 0 ? (
            <ul className="space-y-4">
              {task.map((task) => (
                <li
                  key={task.id}
                  className="bg-blue-100 hover:bg-blue-200 transition p-5 rounded-xl shadow-sm text-left"
                >
                  <h2 className="font-bold text-xl text-gray-800">
                    {task.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{task.detail}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Priority:{" "}
                    <span className="font-semibold">{task.priority}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="font-semibold capitalize">
                      {task.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <h2 className="text-gray-600 text-lg font-medium">
              No Task in your Task History
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryTask;
