import { useEffect, useState, useRef } from "react";
import ChatSideBar from "../components/ChatSideBar";
import Navbar from "../components/navbar";
import main from "../config/gemini";

const ChatBot = () => {
  const [result, setResult] = useState("");
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return; 
    called.current = true;

    const getResult = async () => {
      const res = await main();
      setResult(res);
    };

    getResult();
  }, []);

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
            <pre className="whitespace-pre-wrap break-words">{result}</pre>
          </main>
          <footer className="shrink-0 p-4 border-t flex flex-col gap-2">
            <input
              type="text"
              className="border rounded p-2 focus:outline-none focus:ring"
            />
            <label htmlFor="">Chatbot Gemini 2.5</label>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
