import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUser.js';
import { useSelector } from "react-redux";

const OtherUsers = () => {
    useGetOtherUsers();
    const { otherUsers, onlineUsers } = useSelector(store => store.user);
    const { allMessages } = useSelector(store => store.message);

    if (!otherUsers) return null; // early return

    // Function to get unread count & latest message timestamp
    const getUserChatData = (user) => {
        const chatData = allMessages.find(chat => chat.participants.includes(user._id));
        if (!chatData) return { unreadCount: 0, latestTimestamp: 0 };

        const unreadCount = chatData.messages.filter(msg => msg.senderId === user._id && !msg.isRead).length;
        const latestTimestamp = chatData.messages.length > 0 
            ? new Date(chatData.messages[chatData.messages.length - 1].createdAt).getTime() 
            : 0;

        return { unreadCount, latestTimestamp };
    };

    // Sort users: Unread messages first, then by latest message timestamp
    const sortedUsers = [...otherUsers].sort((a, b) => {
        const { unreadCount: unreadA, latestTimestamp: timeA } = getUserChatData(a);
        const { unreadCount: unreadB, latestTimestamp: timeB } = getUserChatData(b);

        if (unreadA !== unreadB) return unreadB - unreadA; // Sort unread messages first
        return timeB - timeA; // Sort latest message first
    });

    return (
        <div className="overflow-auto flex-1">
            {sortedUsers.map((user) => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
