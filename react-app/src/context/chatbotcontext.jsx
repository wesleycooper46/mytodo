/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [ userinput, setUserinput ] = useState("");
  const [ botresult, setBotresult ] = useState("");
  const [ botresultresponse, setBotresultresponse ] = useState(false);
  const [ userinputprompt, setUserinputprompt ] = useState("")

  const OnSentChatbot = async(userinput) => {
    setUserinputprompt(userinput)
    const res = await main(userinput)
    setBotresultresponse(true);
    setUserinput("");
    setBotresult(res);
    return res;
  }

  const ContextValue = {
    OnSentChatbot,
    userinput,
    setUserinput,
    botresult,
    botresultresponse,
    userinputprompt
  };

  return (
    <Context.Provider value={ContextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;