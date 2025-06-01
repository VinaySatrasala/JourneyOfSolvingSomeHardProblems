import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatContext();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-[#252525] rounded-xl shadow-lg overflow-hidden">
        <div className="w-10 h-10 flex items-center justify-center ml-2">
          <div className="w-6 h-6 rounded-full bg-[#2EEE2E] flex items-center justify-center">
            <span className="text-black font-bold text-xs">A</span>
          </div>
        </div>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 bg-transparent border-none focus:outline-none py-4 px-3 text-sm"
        />
        
        <button 
          type="submit"
          disabled={!message.trim()}
          className={`p-4 ${
            message.trim() 
              ? 'bg-[#2EEE2E] text-black hover:bg-[#25C825]' 
              : 'bg-[#333333] text-gray-500'
          } transition-colors`}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;