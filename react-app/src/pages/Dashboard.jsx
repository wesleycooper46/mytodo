import axios from "axios";
import Navbar from "../components/navbar";
import "../index.css";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [task, setTask] = useState([]);

  const userid = Number(localStorage.getItem("user_id"));
  console.log(userid);

  const StatusChange = async (status, taskid) => {
    try {
      const res = await axios.put("http://localhost:5000/statuschange", {
        status,
        taskid,
      });
      const res2 = await axios.get("http://localhost:5000/alltask", {
        params: { userid },
      });
      console.log(status);
      console.log(res.data.message);
      setTask(res2.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:5000/alltask", {
          params: { userid },
        });
        setTask(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    Fetchdata();
  }, [userid]);

  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl m-6">All Task</h1>
        </div>

        <div className="grid grid-cols-3 items-stretch min-h-screen">
          <div className="border-r-2 border-t-2 h-full text-center">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl mt-4">Todo Task</h1>
            </div>
            <ul>
              {task.map((task) =>
                task.status === "todo" ? (
                  <li key={task.id} className="bg-blue-400 m-6 p-4 rounded-2xl">
                    <h1 className="font-bold text-2xl">{task.title}</h1>
                    <p>{task.detail}</p>
                    <p>{task.priority}</p>
                    <p>{task.due_date}</p>
                    <p>{task.status}</p>
                    <select
                      name="status"
                      value={task.status}
                      id="status"
                      onChange={(e) => {
                        StatusChange(e.target.value, task.id);
                      }}
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div className="border-r-2 border-t-2 h-full text-center">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl mt-4">Inprogress Task</h1>
            </div>
            <ul>
              {task.map((task) =>
                task.status === "in_progress" ? (
                  <li key={task.id} className="bg-blue-400 m-6 p-4 rounded-2xl">
                    <h1 className="font-bold text-2xl">{task.title}</h1>
                    <p>{task.detail}</p>
                    <p>{task.priority}</p>
                    <p>{task.due_date}</p>
                    <p>{task.status}</p>
                    <select
                      name="status"
                      value={task.status}
                      id="status"
                      onChange={(e) => {
                        StatusChange(e.target.value, task.id);
                      }}
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div className="text-center border-t-2 h-full">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl mt-4">Task Done!</h1>
            </div>
            <div className="border-r-2 text-center">
              <ul>
                {task.map((task) =>
                  task.status === "done" ? (
                    <li
                      key={task.id}
                      className="bg-blue-400 m-6 p-4 rounded-2xl"
                    >
                      <h1 className="font-bold text-2xl">{task.title}</h1>
                      <p>{task.detail}</p>
                      <p>{task.priority}</p>
                      <p>{task.due_date}</p>
                      <p>{task.status}</p>
                      <select
                        name="status"
                        value={task.status}
                        id="status"
                        onChange={(e) => {
                          StatusChange(e.target.value, task.id);
                        }}
                      >
                        <option value="todo">Todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
