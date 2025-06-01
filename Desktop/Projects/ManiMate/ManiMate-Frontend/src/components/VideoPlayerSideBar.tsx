import React from 'react';
import ReactPlayer from 'react-player';
import { useChatContext } from '../context/ChatContext';

// Thinking Loader Component
const ThinkingLoader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium text-sm">Thinking...</h3>
          <p className="text-gray-400 text-xs mt-1">Processing your request</p>
        </div>
      </div>
    </div>
  );
};

// Generating Video Loader Component
const GeneratingVideoLoader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {/* Animated video icon */}
          <div className="w-16 h-12 bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2h8a1 1 0 100-2H5z"/>
            </svg>
          </div>
          {/* Progress dots */}
          <div className="flex space-x-1 mt-3 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium text-sm">Generating Video...</h3>
          <p className="text-gray-400 text-xs mt-1">This may take a few moments</p>
        </div>
      </div>
    </div>
  );
};

// Main Video Player Sidebar Component
const VideoPlayerSidebar = () => {
  const { videoUrl, isVideoReady, isPolling, messages } = useChatContext();
  
  // Check if we're waiting for AI response (thinking)
  const isThinking = messages.length > 0 && 
    messages[messages.length - 1].sender === 'user' && 
    !isPolling && 
    !isVideoReady;

  const renderVideoContent = () => {
    // Show thinking loader when waiting for AI response
    if (isThinking) {
      return <ThinkingLoader />;
    }
    
    // Show generating video loader when polling for video
    if (isPolling) {
      return <GeneratingVideoLoader />;
    }
    
    // Show video player when video is ready
    if (isVideoReady && videoUrl) {
      return (
        <>
          <div className="bg-black rounded-lg overflow-hidden">
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="240px"
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous",
                  },
                },
              }}
            />
          </div>

          {/* Video Info */}
          <div className="mt-4 space-y-2">
            <h3 className="text-white font-medium text-sm line-clamp-2">
              Generated Animation
            </h3>
            <p className="text-gray-400 text-xs">
              Your custom animated video is ready
            </p>
          </div>
        </>
      );
    }
    
    // Default placeholder when no video
    return (
      <div className="bg-black rounded-lg overflow-hidden h-[240px] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2h8a1 1 0 100-2H5z"/>
          </svg>
          <p className="text-gray-400 text-sm">No video yet</p>
          <p className="text-gray-500 text-xs mt-1">Start a conversation to generate content</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-[420px] border-l border-[#252525] bg-[#1a1a1a] flex flex-col">
      {/* Video Player Header */}
      <div className="p-4 border-b border-[#252525]">
        <h2 className="text-lg font-medium text-white">Video Player</h2>
        <p className="text-sm text-gray-400 mt-1">
          {isThinking ? 'Processing request...' : 
           isPolling ? 'Generating video...' : 
           isVideoReady ? 'Video ready!' : 
           'Watch generated content'}
        </p>
      </div>

      {/* Video Player Container */}
      <div className="flex-1 p-4">
        {renderVideoContent()}
      </div>

      {/* Video Controls/Options */}
      <div className="p-4 border-t border-[#252525]">
        <div className="flex space-x-2">
          <button 
            className="flex-1 px-3 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isVideoReady}
          >
            Download
          </button>
          <button 
            className="px-3 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isVideoReady}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSidebar;