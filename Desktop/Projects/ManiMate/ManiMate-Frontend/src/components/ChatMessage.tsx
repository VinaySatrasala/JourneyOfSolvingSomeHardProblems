import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageProps {
  message: {
    sender: 'user' | 'animate';
    type?: 'code' | 'error';
    content: string;
    filename?: string;
  };
}

const ChatMessage = ({ message }: MessageProps) => {
  const isUser = message.sender === 'user';
  
  const renderContent = () => {
    if (message.type === 'code') {
      return (
        <div className="mt-2 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-[#252525] px-4 py-2 text-sm flex justify-between items-center">
            <span>Python</span>
            <button className="text-[#2EEE2E] hover:underline">Copy code</button>
          </div>
          <SyntaxHighlighter 
            language="python" 
            style={atomDark} 
            customStyle={{ margin: 0, borderRadius: '0 0 12px 12px' }}
          >
            {message.content}
          </SyntaxHighlighter>
        </div>
      );
    }
    
    return <p className="whitespace-pre-wrap">{message.content}</p>;
  };
  
  return (
    <div className={`mb-6 ${isUser ? 'pl-12' : 'pr-12'}`}>
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-[#2EEE2E] flex items-center justify-center mr-2">
          <span className="text-black font-bold">{isUser ? 'J' : 'A'}</span>
        </div>
        <span className="text-sm font-medium">{isUser ? 'You' : 'Animate'}</span>
      </div>
      
      <div className={`p-4 rounded-xl shadow-lg ${
        isUser ? 'bg-[#252525]' : 'bg-[#1E1E1E] border border-[#333333]'
      }`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;