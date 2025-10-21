import { useContext, useEffect, useState } from "react";
import ChatSideBar from "../components/ChatSideBar";
import Navbar from "../components/navbar";
import { Context } from "../context/chatbotcontext";
import { assets } from "../assets/img/img";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatBot = () => {
  const [ fetchchathistorydata, setFetchchathistorydata ] = useState([]);
  const {
    OnSentChatbot,
    userinput,
    setUserinput,
    botresult,
    userinputprompt,
    setCurrentchatid,

  } = useContext(Context);

  const { chatid } = useParams();

  console.log("chat id : ", chatid);

  setCurrentchatid(chatid);

  console.log("User Prompt: ", userinputprompt);
  console.log("Bot Response: ", botresult);

  useEffect(() => {
    const FetchChatHistory = async () => {
      const res = await axios.get("http://localhost:5000/fetchchathistory", { params: { chatid } });
      // console.log("fetch data : ", res.data);
      setFetchchathistorydata(res.data);
      console.log("fetch data : ", fetchchathistorydata);
    };

    FetchChatHistory();
  }, [chatid, botresult]);

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100svh-96px)] overflow-hidden">
        <ChatSideBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <nav className="shrink-0 p-4 border-b">
            <div className="font-semibold text-lg">ChatBot Assistant</div>
          </nav>
          <main className="flex-1 overflow-y-auto p-4">
           

            {fetchchathistorydata.map((row) => (
              <div key={row.id} className="space-y-1">
                <div className="text-right mt-4">
                  <span className="inline-block rounded-lg bg-gray-100 px-3 py-2">
                    {row.userinput}
                  </span>
                </div>
                <div className="text-left mt-4">
                  <pre className="whitespace-pre-wrap break-words rounded-lg bg-blue-50 px-3 py-2">
                    {row.botresponse}
                  </pre>
                </div>
              </div>
            ))}

            

          </main>
          <footer className="shrink-0 p-4 border-t flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                value={userinput}
                onChange={(e) => setUserinput(e.target.value)}
              />
              <img
                onClick={() => OnSentChatbot(userinput)}
                src={assets.sentarrow}
                alt=""
                className="w-6 h-6 cursor-pointer hover:opacity-80 active:scale-95 transition"
              />
            </div>

            <label className="text-sm text-gray-500 text-center">
              Chatbot Gemini 2.5
            </label>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
