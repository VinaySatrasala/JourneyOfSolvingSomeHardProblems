import React from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const ChatInterface = () => {
  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ChatInterface;