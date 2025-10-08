import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./pages/welcome";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Addtask from "./pages/Addtask";
import HistoryTask from "./pages/HistoryAllTask";
import EditTask from "./pages/Taskedit";
import ChatBot from "./pages/chatbot";
import ContextProvider from "./context/chatbotcontext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addtask" element={<Addtask />} />
        <Route path="/historytask" element={<HistoryTask />} />
        <Route path="/task/:id" element={<EditTask />} />
        <Route
          path="/chatbot"
          element={
            <ContextProvider>
              <ChatBot />
            </ContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
