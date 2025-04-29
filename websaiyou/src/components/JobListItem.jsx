import React from 'react';

const JobListItem = ({ logo, company, title, salary, location }) => {
  return (
    <div className="flex items-center p-5 ml-5 mr-2 mb-5 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 cursor-pointer ">
      {/* Logo */}
      <div className="flex border-b p-4 hover:bg-gray-50">
        <img
          src={logo}
          alt={`${company} logo`}
          className="w-24 h-24 object-contain mr-4"
        />
      </div>

      {/* Info */}
      <div className="ml-5 flex-1">
        <h3 className="font-bold text-lg text-black mb-1">{title}</h3>
        <p className="text-gray-700 mb-1">{company}</p>
        <p className="text-sm text-gray-600">
                  <span className="inline-block mr-2">💰 Lương: {salary}
                  </span>
                  <span>📍 {location}</span>
                </p>
      
      </div>
      
    </div>
    
  );
};

export default JobListItem;
