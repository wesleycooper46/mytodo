/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import main from "../config/gemini";
import axios from "axios";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [ userinput, setUserinput ] = useState("");
  const [ botresult, setBotresult ] = useState("");
  const [ botresultresponse, setBotresultresponse ] = useState(false);
  const [ userinputprompt, setUserinputprompt ] = useState("")
  const [ currentchatid, setCurrentchatid ] = useState("");

  const OnSentChatbot = async(userinput) => {
    setUserinputprompt(userinput)
    const botres = await main(userinput)
    setBotresultresponse(true);
    setBotresult(botres);
    //insertinputandresponsedatatodb
    if (userinput, botres)
      await axios.post("http://localhost:5000/insertchatresponse", { currentchatid ,userinput, botres })
    setUserinput("");
    
  }

  const ContextValue = {
    OnSentChatbot,
    userinput,
    setUserinput,
    botresult,
    botresultresponse,
    userinputprompt,
    setCurrentchatid,
    currentchatid,
  };

  return (
    <Context.Provider value={ContextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;