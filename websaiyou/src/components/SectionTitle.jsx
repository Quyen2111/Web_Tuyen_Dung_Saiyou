import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4 animate-slideInLeft">
      {title}
    </h2>
  );
};

export default SectionTitle;