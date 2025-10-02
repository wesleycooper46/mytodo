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

  const ClickAdd = async (e) => {
    e.preventDefault();
    const userid = Number(localStorage.getItem("user_id"));
    console.log(userid);

    if (!tasktitle || !detail || !priority || !duedate) {
      alert("Please Complete the Box");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/addtask", {
        tasktitle,
        detail,
        priority,
        duedate,
        userid,
      });
      const { message } = res.data;
      console.log(message);
      navigate("/addtask");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen justify-center items-center">
        <div className="bg-blue-300 rounded-2xl p-8 w-full max-w-md gap">
          <h1>Add Your Task</h1>
          <form onSubmit={ClickAdd}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              value={tasktitle}
              onChange={(e) => setTasktitle(e.target.value)}
            />

            <label htmlFor="detail">Detail:</label>
            <textarea
              name="detail"
              id="detail"
              rows={4}
              cols={50}
              value={detail}
              onChange={(e) => setdetail(e.target.value)}
            />

            <label htmlFor="priority">Priority:</label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value={"Low"}>Low</option>
              <option value={"Medium"}>Medium</option>
              <option value={"High"}>High</option>
              <option value={"Urgent"}>Urgent</option>
            </select>

            <label htmlFor="duedate">Due Date</label>
            <input
              type="date"
              value={duedate}
              onChange={(e) => setDuedate(e.target.value)}
            />

            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addtask;
