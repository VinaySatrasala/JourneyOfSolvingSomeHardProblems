import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const Sidebar = () => {
  const { startNewChat } = useChatContext();
  
  return (
    <div className="w-[280px] h-full flex flex-col bg-[#1A1A1A] shadow-xl">
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          <ChatItem 
            title="Circle transformation animation" 
            subtitle="3D transforms and scene transitions" 
            active
          />
          <ChatItem 
            title="Graph theory visualization" 
            subtitle="Animated network with custom nodes" 
          />
          <ChatItem 
            title="Matrix operations" 
            subtitle="Linear algebra animations" 
          />
        </div>
      </div>
      
      <div className="p-3">
        <button 
          onClick={startNewChat}
          className="w-full flex items-center justify-center gap-2 bg-[#2EEE2E] hover:bg-[#25C825] text-black font-medium py-3 px-4 rounded-xl transition-colors shadow-lg"
        >
          <Plus size={20} />
          <span>New chat</span>
        </button>
      </div>
    </div>
  );
};

const ChatItem = ({ title, subtitle, active = false }) => (
  <div className={`p-3 rounded-xl cursor-pointer transition-all transform hover:scale-102 ${
    active ? 'bg-[#252525] shadow-lg' : 'hover:bg-[#252525]'
  }`}>
    <div className="flex items-center gap-2">
      <MessageSquare size={18} className="text-[#2EEE2E]" />
      <span className="text-sm font-medium truncate">{title}</span>
    </div>
    <p className="text-xs text-gray-400 ml-7 mt-1 truncate">{subtitle}</p>
  </div>
);

export default Sidebar;