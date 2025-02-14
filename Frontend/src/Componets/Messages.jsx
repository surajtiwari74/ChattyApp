import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetmessege';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTime';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    
    const { messages } = useSelector(store => store.message);
    const {authUser } = useSelector(store => store.user); // Get the logged-in user

    return (
        <div className="px-4 flex-1 overflow-y-auto h-[80vh] space-y-3 pb-4">
            {messages && messages.map((message, i) => (
                <div key={message._id} className="relative flex flex-col">
                    <Message message={message} />
                    
                    {/* Show status only if the logged-in user is the sender */}
                    {message.senderId === authUser._id && i === messages.length - 1 && (
                        <span className="text-xs text-gray-400 self-end mt-1">
                            {message.status === "read" ? "✔✔ Read" : message.status === "delivered" ? "✔ Delivered" : "✓ Sent"}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Messages;
