import { BrowserRouter, Route, Routes} from "react-router-dom"

import Welcome from "./pages/welcome";
import Login from "./pages/login"
import Register from "./pages/register"
import Dashboard from "./pages/Dashboard";
import Addtask from "./pages/Addtask";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/addtask" element={<Addtask/>}/>
      </Routes>
    </BrowserRouter>
  );
}