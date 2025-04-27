import React from 'react';

const JobListItem = ({ logo, company, title, salary, location }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      {/* Logo công ty */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={logo}
          alt={`${company} logo`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thông tin công việc */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{company}</p>
        <div className="flex items-center mt-2 space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
              />
            </svg>
            {salary}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.243l-4.243-4.243m0 0L9.172 7.757M13.414 12H21m-7.586 4.243l4.243 4.243M6.343 7.757l-4.243-4.243M2.1 12H9.172m4.242-4.243l4.243-4.243M6.343 16.243l-4.243 4.243"
              />
            </svg>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListItem;