import { useContext, useEffect, useState } from "react";
import ChatSideBar from "../components/ChatSideBar";
import Navbar from "../components/navbar";
import { Context } from "../context/chatbotcontext";
import { assets } from "../assets/img/img";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ChatBot = () => {
  const [fetchchathistorydata, setFetchchathistorydata] = useState([]);
  const {
    OnSentChatbot,
    userinput,
    setUserinput,
    botresult,
    userinputprompt,
    setCurrentchatid,
  } = useContext(Context);

  const navigate = useNavigate();

  const { chatid, chatname } = useParams();
  const userid = localStorage.getItem("user_id");

  console.log("chat id : ", chatid);

  setCurrentchatid(chatid);

  console.log("User Prompt: ", userinputprompt);
  console.log("Bot Response: ", botresult);

  useEffect(() => {
    const FetchChatHistory = async () => {
      const res = await axios.get("http://localhost:5000/fetchchathistory", {
        params: { chatid },
      });
      setFetchchathistorydata(res.data);
    };

    FetchChatHistory();
  }, [chatid, botresult]);

  const ClickDeleteChat = async() => {
    try{
      const res = await axios.delete(`http://localhost:5000/deletechatid=${chatid}`);
      alert(res.data.message)
      navigate(`/chatbot/${userid}`)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-96px)] overflow-hidden bg-gradient-to-br from-[#ede8f5] to-[#c7d3ed]">
        <ChatSideBar chatidfromchatbot={chatid} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <nav className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
            {/* Left: Chat title */}
            <div>
              {chatname ? (
                <div className="font-bold text-xl text-blue-700">
                  ChatBot Assistant :{" "}
                  <span className="text-gray-700">{chatname} Chat</span>
                </div>
              ) : (
                <div className="font-bold text-xl text-blue-700">
                  ChatBot Assistant
                </div>
              )}
            </div>

            {/* Right: Delete button */}

            {chatid && chatname ? (
              <div onClick={ClickDeleteChat} className="flex items-center gap-2 cursor-pointer bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-3 py-1 transition">
                <img
                  className="w-5 h-5 opacity-80"
                  src={assets.deletechat}
                  alt="deletechat"
                />
                <span className="font-medium text-sm">Delete Chat</span>
              </div>
            ) : null}
          </nav>

          {/* Chat Area */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {fetchchathistorydata.map((row) => (
              <div key={row.id} className="space-y-2 mb-6">
                <div className="text-right">
                  <span className="inline-block rounded-2xl bg-blue-100 text-gray-800 px-4 py-2 shadow-sm">
                    {row.userinput}
                  </span>
                </div>
                <div className="text-left">
                  <pre className="whitespace-pre-wrap break-words inline-block rounded-2xl bg-white px-4 py-2 border border-gray-200 shadow-sm text-gray-700">
                    {row.botresponse}
                  </pre>
                </div>
              </div>
            ))}
          </main>

          {/* Footer */}
          <footer className="shrink-0 p-4 border-t bg-white flex flex-col gap-2 shadow-inner">
            <div className="flex items-center gap-3">
              <input
                type="text"
                className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={userinput}
                onChange={(e) => setUserinput(e.target.value)}
                placeholder="Type your message..."
              />
              <img
                onClick={() => OnSentChatbot(userinput)}
                src={assets.sentarrow}
                alt="Send"
                className="w-7 h-7 cursor-pointer hover:opacity-80 active:scale-95 transition"
              />
            </div>

            <label className="text-sm text-gray-500 text-center select-none">
              Chatbot Gemini 2.5
            </label>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
