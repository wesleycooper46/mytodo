import { useEffect, useState } from "react";
import { assets } from "../assets/img/img";
import Modal from "./modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatSideBar = (chatidfromchatbot) => {
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
  }, [userid, chatidfromchatbot]);

  return (
    <>
      <div className="bg-white border-r border-gray-200 flex-col inline-block h-[calc(100vh-96px)] w-60 shadow-md">
        {/* Top Section */}
        <div
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-3 m-4 cursor-pointer bg-blue-100 hover:bg-blue-200 rounded-xl p-3 transition"
        >
          <img src={assets.plus} alt="newchat" className="w-5 h-5" />
          <span className="font-semibold text-blue-700">New Chat</span>
        </div>

        {/* Recent Label */}
        <div className="ml-6 mt-4 font-semibold text-gray-600 text-sm uppercase tracking-wide">
          Recent
        </div>

        {/* Chat History */}
        <div className="mt-2 overflow-y-auto h-[calc(100%-140px)]">
          {chatlist.length > 0 ? (
            chatlist.map((chatlist) => (
              <div
                key={chatlist.chat_id}
                onClick={() =>
                  navigate(`/chatbot/${chatlist.chat_id}/${chatlist.chat_name}`)
                }
                className="flex items-center justify-between px-4 py-3 mx-2 mt-2 rounded-lg hover:bg-blue-100 cursor-pointer transition"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={assets.morechat}
                    alt="recentchat"
                    className="w-5 h-5 opacity-70"
                  />
                  <span className="text-gray-700 truncate font-medium">
                    {chatlist.chat_name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 mt-10 text-sm">
              No chats yet
            </div>
          )}
        </div>
      </div>

      {/* Modal for creating new chat */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col p-6 gap-4">
          <h1 className="font-bold text-2xl text-blue-700 text-center">
            Create New Chat
          </h1>
          <div className="flex flex-col gap-3 bg-gray-50 p-4 rounded-2xl shadow-inner">
            <input
              value={chatname}
              type="text"
              placeholder="Enter chat name..."
              onChange={(e) => setChatname(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-2 font-semibold transition"
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
