import { useContext } from "react";
import ChatSideBar from "../components/ChatSideBar";
import Navbar from "../components/navbar";
import { Context } from "../context/chatbotcontext";
import { assets } from "../assets/img/img";

const ChatBot = () => {
  const {
    OnSentChatbot,
    userinput,
    setUserinput,
    botresult,
    userinputprompt
  } = useContext(Context);

  console.log("User Prompt: ", userinputprompt);
  console.log("Bot Response: ", botresult);

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
            {botresult ? (
              <div className="flex flex-col">
                <p className="justify-end">-- {userinputprompt} --</p>
                <pre className="whitespace-pre-wrap break-words">Chatbot -- {botresult}</pre>
              </div>
            ) : 
              <div>How Can I Help You bruh</div>
            }
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
