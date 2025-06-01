import axios from 'axios';
import { createContext, useContext, useState, useRef } from 'react';

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  videoFileName: string | null;
  isVideoReady: boolean;
  videoUrl: string | null;
  isPolling: boolean;
}

interface Message {
  sender: 'user' | 'animate';
  content: string;
  type?: 'code' | 'error';
  filename?: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkVideoStatus = async (filename: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/getvideo`,
        { filename },
        {
          timeout: 5000,
        }
      );

      // If video is ready, stop polling and set the video URL
      if (response.status === 200 && response.data.video_url) {
        console.log('Video is ready!');
        stopPolling();
        
        // Set the video URL from backend
        const fullVideoUrl = `http://localhost:3000${response.data.video_url}`;
        setVideoUrl(fullVideoUrl);
        setIsVideoReady(true);
        
        console.log('Video URL received:', fullVideoUrl);
      }
      
    } catch (error) {
      // Video not ready yet, continue polling
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Video not ready yet, continuing to poll...');
      } else {
        console.error('Error checking video status:', error);
      }
    }
  };

  const startPolling = (filename: string) => {
    setIsPolling(true);
    console.log('Starting video polling for:', filename);
    
    pollingIntervalRef.current = setInterval(() => {
      checkVideoStatus(filename);
    }, 1000); // Poll every 1 second
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPolling(false);
    console.log('Stopped video polling');
  };

  const sendMessage = async (content: string) => {
    // Stop any existing polling
    stopPolling();
    
    // Reset video states
    setIsVideoReady(false);
    setVideoUrl(null);
    setVideoFileName(null);
    
    setMessages(prev => [...prev, { sender: 'user', content }]);

    try {
      const response = await axios.post('http://localhost:3000/generate', 
        { prompt: content },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // Store the filename from the generate response
      if (response.data.filename) {
        setVideoFileName(response.data.filename);
        
        // Start polling for video readiness
        startPolling(response.data.filename);
      }

      setMessages(prev => [...prev, {
        sender: 'animate',
        content: response.data.response,
        type: response.data.type,
        filename: response.data.filename
      }]);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data
        });
      }
      setMessages(prev => [...prev, {
        sender: 'animate',
        content: 'Sorry, I encountered an error processing your request.',
        type: 'error'
      }]);
    }
  };

  // Cleanup function
  const cleanup = () => {
    stopPolling();
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      videoFileName, 
      isVideoReady, 
      videoUrl,
      isPolling
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within ChatProvider');
  return context;
};