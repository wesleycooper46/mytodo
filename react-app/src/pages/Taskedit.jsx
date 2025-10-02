import "../index.css";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [priority, setPriority] = useState("");
  const [duedate, setDuedate] = useState("");
  // const { task, setTask} = useState([])

  const navigate = useNavigate();

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

  const HandleSaveEditTask = async (e) => {
    e.preventDefault();
    console.log("data before update: ", title, detail, priority, duedate);
    const res = await axios.put(`http://localhost:5000/task/edittaskid=${id}`, {
      title,
      detail,
      priority,
      duedate,
    });
    alert(res.data.message);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div>
        <div>
          <form onSubmit={HandleSaveEditTask}>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              className="border-2 rounded-1xl"
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="detail">Detail: </label>
            <textarea
              name="detail"
              id="detail"
              rows={4}
              cols={50}
              value={detail}
              className="border-2 rounded-1xl"
              onChange={(e) => setDetail(e.target.value)}
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

            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
