import axios from "axios";
import Navbar from "../components/navbar";
import "../index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [task, setTask] = useState([]);

  // const navigate = useNavigate();
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
    const FetchAllTaskdata = async () => {
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

    FetchAllTaskdata();
  }, [userid]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="text-center mb-10">
          <h1 className="font-extrabold text-4xl text-blue-700 drop-shadow-md">
            All Tasks
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {/* Todo Task */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
            <h2 className="font-bold text-2xl text-blue-600 text-center mb-4">
              Todo Tasks
            </h2>
            <ul className="space-y-4">
              {task.map(
                (t) =>
                  t.status === "todo" && (
                    <li
                      key={t.id}
                      className="bg-blue-100 hover:bg-blue-200 transition p-4 rounded-xl shadow-sm"
                    >
                      <h3 className="font-bold text-xl text-gray-800">
                        {t.title}
                      </h3>
                      <p className="text-gray-600">{t.detail}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Priority: <span className="font-semibold">{t.priority}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {t.due_date}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <select
                          name="status"
                          value={t.status}
                          onChange={(e) => StatusChange(e.target.value, t.id)}
                          className="border rounded-lg px-3 py-1 bg-white focus:outline-none"
                        >
                          <option value="todo">Todo</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                        <Link
                          to={`/task/${t.id}`}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Edit
                        </Link>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* In Progress Task */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
            <h2 className="font-bold text-2xl text-yellow-600 text-center mb-4">
              In Progress
            </h2>
            <ul className="space-y-4">
              {task.map(
                (t) =>
                  t.status === "in_progress" && (
                    <li
                      key={t.id}
                      className="bg-yellow-100 hover:bg-yellow-200 transition p-4 rounded-xl shadow-sm"
                    >
                      <h3 className="font-bold text-xl text-gray-800">
                        {t.title}
                      </h3>
                      <p className="text-gray-600">{t.detail}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Priority: <span className="font-semibold">{t.priority}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {t.due_date}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <select
                          name="status"
                          value={t.status}
                          onChange={(e) => StatusChange(e.target.value, t.id)}
                          className="border rounded-lg px-3 py-1 bg-white focus:outline-none"
                        >
                          <option value="todo">Todo</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Done Task */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
            <h2 className="font-bold text-2xl text-green-600 text-center mb-4">
              Completed
            </h2>
            <ul className="space-y-4">
              {task.map(
                (t) =>
                  t.status === "done" && (
                    <li
                      key={t.id}
                      className="bg-green-100 hover:bg-green-200 transition p-4 rounded-xl shadow-sm"
                    >
                      <h3 className="font-bold text-xl text-gray-800">
                        {t.title}
                      </h3>
                      <p className="text-gray-600">{t.detail}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Priority: <span className="font-semibold">{t.priority}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {t.due_date}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <select
                          name="status"
                          value={t.status}
                          onChange={(e) => StatusChange(e.target.value, t.id)}
                          className="border rounded-lg px-3 py-1 bg-white focus:outline-none"
                        >
                          <option value="todo">Todo</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
