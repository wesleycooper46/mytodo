import { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addtask = () => {
  const [tasktitle, setTasktitle] = useState("");
  const [detail, setdetail] = useState("");
  const [priority, setPriority] = useState("");
  const [duedate, setDuedate] = useState("");
  const navigate = useNavigate();


  // ฟังชันสำหรับเพิ่มข้อมูล Task ลง Database
  const ClickToAddTask = async (e) => {
    e.preventDefault(); // หยุด event ที่จะ reload หน้า เช่น form
    const userid = Number(localStorage.getItem("user_id")); // ใช้ userid ที่เก็บใน localstorage มาเป็นตัวอ้างอิง user 
    console.log(userid);

    // เช็คว่าค่าที่กรอกใน form ครบหรือไม่
    if (!tasktitle || !detail || !priority || !duedate) { 
      alert("Please Complete the Box");
      return;
    }

    try {
      // ใช้ method post ในการ insert ข้อมูลจาก form โดยส่งค่าที่อยู่ใน state ไป {..,..,..}
      const res = await axios.post("http://localhost:5000/addtask", {
        tasktitle,
        detail,
        priority,
        duedate,
        userid,
      });
      const { message } = res.data; // เอาค่าของ message ที่ backend ส่งมา
      console.log(message);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-96px)] justify-center items-center bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
            Add Your Task
          </h1>
          <form onSubmit={ClickToAddTask} className="space-y-5"> {/* ใช้งานฟังชัน ClickToAddTask ตอนที่กด Submit */}
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Title:
              </label>
              <input
                type="text"
                value={tasktitle}
                onChange={(e) => setTasktitle(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="detail" className="block text-gray-700 font-medium mb-2">
                Detail:
              </label>
              <textarea
                name="detail"
                id="detail"
                rows={4}
                cols={50}
                value={detail}
                onChange={(e) => setdetail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">
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
              <label htmlFor="duedate" className="block text-gray-700 font-medium mb-2">
                Due Date:
              </label>
              <input
                type="date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2 mt-4 transition shadow-md"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addtask;
