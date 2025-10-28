import "../index.css";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("");
  const [duedate, setDuedate] = useState("");

  const navigate = useNavigate();

  // fetchdata ทั้งหมดที่คลิปเข้ามาแก้เพิ่อเป็นข้อมูลตั้งต้นก่อนแก้
  useEffect(() => {
    const FetchDataByid = async () => {
      const res = await axios.get(`http://localhost:5000/task/${id}`);
      setTitle(res.data.title);
      setDetail(res.data.detail);
      setPriority(res.data.priority);
      setDuedate(res.data.due_date);
    };
    FetchDataByid();
  }, [id]);

  // ฟังชันสำหรับ update ค่าที่ได้แก้ไปหลังกด save
  const HandleSaveEditTask = async (e) => {
    e.preventDefault();
    console.log("data before update: ", title, detail, priority, duedate);
    const res = await axios.put(`http://localhost:5000/task/edittaskid=${id}`, {
      title,
      detail,
      priority,
      duedate,
    });
    alert(res.data.message); // เอาค่าของ message ที่ backend ส่งมา
    navigate("/dashboard");
  };

  // ฟังชันที่ใช้ลบ task ที่เลือกไว้
  const HandleDeleteTask = async (e) => {
    e.preventDefault();
    const res = await axios.delete(
      `http://localhost:5000/task/deletetaskid=${id}`
    );
    alert(res.data.message);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-96px)] bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
            Edit Task
          </h1>
          <form onSubmit={HandleSaveEditTask} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="detail"
                className="block text-gray-700 font-medium mb-2"
              >
                Detail:
              </label>
              <textarea
                name="detail"
                id="detail"
                rows={4}
                cols={50}
                value={detail}
                className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-gray-700 font-medium mb-2"
              >
                Priority:
              </label>
              <select
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={"Low"}>Low</option>
                <option value={"Medium"}>Medium</option>
                <option value={"High"}>High</option>
                <option value={"Urgent"}>Urgent</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="duedate"
                className="block text-gray-700 font-medium mb-2"
              >
                Due Date:
              </label>
              <input
                type="date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl px-6 py-2 shadow-sm transition cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Return
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-2 shadow-md transition cursor-pointer"
              >
                Save
              </button>

              <button
                type="button"
                onClick={HandleDeleteTask}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-6 py-2 shadow-md transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
