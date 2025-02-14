import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const { allMessages } = useSelector((store) => store.message);

  const isOnline = onlineUsers?.includes(user._id);
  const chatData = allMessages.find((chat) => chat.participants.includes(user._id));
  
  const lastMessageObj = chatData ? chatData.messages[chatData.messages.length - 1] : null;
  const lastMessage = lastMessageObj ? lastMessageObj.message : "No messages yet";
  
  const unreadMessages = chatData ? chatData.messages.filter(msg => msg.senderId === user._id && !msg.isRead).length : 0;

  const isUnread = unreadMessages > 0;

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  const notifyUser = (username, message) => {
   
    if (Notification.permission === "granted") {
      new Notification(`New message from ${username}`, {
        body: message,
        icon: user?.profilePhoto || "/default-icon.png",
      });
    }
  };

  useEffect(() => {

    if (isUnread && lastMessageObj?.senderId === user._id) {
      
      notifyUser(user.username, lastMessage);
    }
  }, [unreadMessages, lastMessageObj]);  

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-black" : "text-white"
        } flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-12 rounded-full border border-gray-300">
            <img src={user?.profilePhoto} alt="user-profile" className="w-full h-full object-cover rounded-full" />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>

        {/* User Details */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p className="font-semibold">{user?.username}</p>
            {unreadMessages > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadMessages}</span>
            )}
          </div>
          <p className={`text-sm truncate w-40 ${isUnread ? "font-bold text-black text-2xl" : "text-gray-900"}`}>
            {lastMessage}
          </p>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;
