import { useEffect, useState } from "react";
import { assets } from "../assets/img/img";
import Modal from "./modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatSideBar = () => {
  const [open, setOpen] = useState(false);
  const [chatname, setChatname] = useState("");
  const [chatlist, setChatlist] = useState([]);

  const userid = Number(localStorage.getItem("user_id"));
  const navigate = useNavigate();

  const CreateChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/createchat", {
        userid,
        chatname,
      });
      alert(res.data.message);
      // navigate(`/chatbot/${res.data.chat_id}/${chatname}`)
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const FetchChatList = async () => {
      const res = await axios.get("http://localhost:5000/fetchchatlist", {
        params: { userid },
      });
      setChatlist(res.data);
      console.log("Chat List : ", res.data);
      console.log("user_id to fetch chatlist : ", userid);
    };

    FetchChatList();
  }, [userid]);

  return (
    <>
      <div className="bg-blue-100 flex-col inline-block h-[calc(100svh-96px)] w-48">
        {/*sidebar*/}
        <div>
          {/* top */}
          <div
            onClick={() => setOpen(true)}
            className="flex items-center m-4 gap-4 cursor-pointer rounded-2xl p-3 justify-center bg-blue-200"
          >
            <img src={assets.plus} alt="newchat" />
            <div>New Chat</div>
          </div>
        </div>
        <div className="ml-6 mt-4">Recent</div>
        <div>
          {" "}
          {/*chathistory*/}
          {chatlist.map((chatlist) => (
            <div key={chatlist.chat_id} onClick={() => navigate(`/chatbot/${chatlist.chat_id}/${chatlist.chat_name}`)} className="flex mt-4 gap-4 p-4 w-full hover:bg-blue-200 cursor-pointer items-center">
              <img src={assets.morechat} alt="recentchat" />
              <div> {chatlist.chat_name} </div>
            </div>
          ))}:
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col p-4 gap-4">
          <h1 className="font-bold text-2xl">Create New Chat</h1>
          <div className="bg-blue-200 p-2 rounded-2xl">
            <input
              value={chatname}
              type="text"
              onChange={(e) => setChatname(e.target.value)}
            />
            <button
              className="bg-blue-300 hover:bg-blue-400 cursor-pointer rounded-2xl p-2 m-2"
              onClick={CreateChat}
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChatSideBar;
