import React, { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChatContext } from "../context/ChatContext";
import ReactPlayer from "react-player";
import VideoPlayerSidebar from "./VideoPlayerSideBar";
const ChatArea = () => {
  const { messages } = useChatContext();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#121212]">
      {/* Header */}
      <div className="flex items-center p-4 justify-between border-b border-[#252525]">
        {/* Your existing header content can go here */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {messages.length === 0 ? (
              <WelcomeScreen />
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            )}
          </div>

          {/* Chat Input Section */}
          <div className="p-4 border-t border-[#252525]">
            <ChatInput />
            <div className="text-center mt-2 text-xs text-gray-400">
              ManiMate can make mistakes. Consider checking important
              information.
            </div>
          </div>
        </div>

        {/* Video Player Sidebar */}
        <VideoPlayerSidebar />
      </div>
    </div>
  );
};

export default ChatArea;
