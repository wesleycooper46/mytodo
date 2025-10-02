import "../index.css";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const HistoryTask = () => {
  const [task, setTask] = useState([]);
  const userid = localStorage.getItem("user_id");

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
      <div className="flex border-r-2 h-full text-center justify-center">
        {task.length > 0 ? (
          <ul className="w-1/2">
            {task.map((task) => (
              <li key={task.id} className="bg-blue-400 m-4 p-4 rounded-2xl">
                <h1>{task.title}</h1>
                <p>{task.detail}</p>
                <p>{task.priority}</p>
                <p>{task.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h1>No Task in your Task History</h1>
        )}
      </div>
    </>
  );
};

export default HistoryTask;
