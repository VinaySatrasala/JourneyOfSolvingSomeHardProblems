import React from 'react';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-102 border border-[#333333] hover:border-[#2EEE2E]">
      <div className="w-12 h-12 rounded-xl bg-[#252525] flex items-center justify-center mb-4 text-[#2EEE2E]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;