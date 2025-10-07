import { assets } from "../assets/img/img";
const ChatSideBar = () => {
  return (
    <>
      <div className="bg-blue-100 flex-col inline-block h-[calc(100svh-96px)] w-48">
        {" "}
        {/*sidebar*/}
        <div>
          {" "}
          {/*top*/}
          <div className="flex items-center m-4 gap-4 cursor-pointer rounded-2xl p-3 justify-center bg-blue-200">
            <img src={assets.plus} alt="newchat" />
            <div>New Chat</div>
          </div>
        </div>
        <div className="ml-6 mt-4">Recent</div>
        <div>
          {" "}
          {/*chathistory*/}
          <div className="flex mt-4 gap-4 p-4 w-full hover:bg-blue-200 cursor-pointer items-center">
            <img src={assets.morechat} alt="recentchat" />
            <div> Test </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
