import React from 'react';
import { ArrowRight, Code, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="w-20 h-20 rounded-full bg-[#2EEE2E] flex items-center justify-center mx-auto mb-8">
            <span className="text-black font-bold text-3xl">M</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#2EEE2E] to-[#25C825] text-transparent bg-clip-text">
            ManiMate
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Your AI companion for creating stunning mathematical animations with Manim. Transform complex concepts into beautiful visualizations.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 bg-[#2EEE2E] text-black px-8 py-3 rounded-xl font-medium hover:bg-[#25C825] transition-colors text-lg"
          >
            Start Creating <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] hover:border-[#2EEE2E] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#252525] flex items-center justify-center mb-6 text-[#2EEE2E]">
              <Code size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Smart Code Generation</h3>
            <p className="text-gray-400">
              Describe your animation in plain English and let ManiMate generate the perfect Manim code for you.
            </p>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] hover:border-[#2EEE2E] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#252525] flex items-center justify-center mb-6 text-[#2EEE2E]">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Beautiful Animations</h3>
            <p className="text-gray-400">
              Create professional-grade mathematical animations with smooth transitions and elegant effects.
            </p>
          </div>

          <div className="bg-[#1E1E1E] p-8 rounded-xl border border-[#333333] hover:border-[#2EEE2E] transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#252525] flex items-center justify-center mb-6 text-[#2EEE2E]">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Instant Results</h3>
            <p className="text-gray-400">
              Get your animation code instantly and iterate quickly with real-time suggestions and improvements.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;