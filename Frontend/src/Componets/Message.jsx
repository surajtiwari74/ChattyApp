import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const scroll = useRef();

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  if (!selectedUser) {
    return <></>; // Render an empty fragment instead of returning early
  }

  // Ensure messages belong to the selected user
  if (
    message?.senderId !== selectedUser?._id &&
    message?.receiverId !== selectedUser?._id
  ) {
    return null; // Don't render messages from other users
  }

  const date = new Date(message?.createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const timeOnly = `${hours}:${minutes}`;

  // Format display time based on date
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  let displayTime;
  if (date.toDateString() === today.toDateString()) {
    displayTime = `Today, ${timeOnly}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    displayTime = `Yesterday, ${timeOnly}`;
  } else {
    displayTime = `${date.toLocaleDateString()}, ${timeOnly}`;
  }

  return (
    <div
      ref={scroll}
      className={`flex items-start gap-2 ${
        message?.senderId === authUser?._id ? "justify-end" : "justify-start"
      }`}
    >
      {/* Profile Image (Left Side for Other Users) */}
      {message?.senderId !== authUser?._id && selectedUser?.profilePhoto && (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={selectedUser.profilePhoto} alt="User Profile" />
        </div>
      )}

      {/* Message Container */}
      <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg flex flex-col items-start">
        {/* Display Time */}
        <time className="text-xs text-gray-500">{displayTime}</time>

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-lg mt-1 ${
            message?.senderId === authUser?._id
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {message?.message}
        </div>
      </div>

      {/* Profile Image (Right Side for Auth User) */}
      {message?.senderId === authUser?._id && authUser?.profilePhoto && (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={authUser.profilePhoto} alt="Your Profile" />
        </div>
      )}
    </div>
  );
};

export default Message;
