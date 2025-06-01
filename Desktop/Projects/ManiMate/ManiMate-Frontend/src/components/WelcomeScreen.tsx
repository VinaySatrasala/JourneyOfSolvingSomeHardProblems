import React from 'react';
import FeatureCard from './FeatureCard';
import { Code, Wand2, Sparkles } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto -mt-16">
      <div className="w-16 h-16 rounded-full bg-[#2EEE2E] flex items-center justify-center mb-6">
        <span className="text-black font-bold text-2xl">M</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-[#2EEE2E] to-[#25C825] text-transparent bg-clip-text">
        Welcome to ManiMate
      </h1>
      
      <p className="text-gray-400 text-lg text-center mb-12 max-w-xl">
        Your AI-powered assistant for creating beautiful mathematical animations with Manim. Start a conversation to generate Python scripts for your visualizations.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <FeatureCard 
          title="Smart Templates" 
          description="Access a library of pre-built animation templates for common mathematical concepts" 
          icon={<Code className="w-6 h-6" />} 
        />
        
        <FeatureCard 
          title="Intelligent Suggestions" 
          description="Get real-time suggestions to enhance your animations and make them more engaging" 
          icon={<Wand2 className="w-6 h-6" />} 
        />
        
        <FeatureCard 
          title="Custom Animations" 
          description="Create unique animations tailored to your specific mathematical concepts" 
          icon={<Sparkles className="w-6 h-6" />} 
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;