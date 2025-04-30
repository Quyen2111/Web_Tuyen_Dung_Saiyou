import React from 'react';

const SkillItem = ({ skill, onDelete }) => {
  return (
    <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2 transition-all duration-300 transform hover:scale-105 hover:bg-blue-200 hover:shadow-md">
      <span>{skill}</span>
      <button
        onClick={onDelete}
        className="ml-2 text-red-600 hover:text-red-800 transform hover:scale-110 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default SkillItem;