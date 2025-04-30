import React, { useState } from 'react';

const EducationItem = ({ education, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEducation, setEditedEducation] = useState(education);

  const handleSave = () => {
    onUpdate(editedEducation);
    setIsEditing(false);
  };

  return (
    <div className="border-l-4 border-blue-500 pl-4 transition-all duration-300 hover:shadow-lg hover:bg-blue-50 p-4 rounded-lg mb-4">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedEducation.institution}
            onChange={(e) => setEditedEducation({ ...editedEducation, institution: e.target.value })}
            placeholder="Trường học..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editedEducation.duration}
            onChange={(e) => setEditedEducation({ ...editedEducation, duration: e.target.value })}
            placeholder="Thời gian (VD: 2016 - 2020)..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
            >
              Lưu
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <h3 className="text-lg font-semibold text-gray-800">{education.institution}</h3>
          <p className="text-sm text-gray-600">{education.duration}</p>
          <div className="absolute top-0 right-0 flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-7 7a2 2 0 01-.828.414l-3 1a1 1 0 01-1.224-1.224l1-3a2 2 0 01.414-.828l7-7z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800 transform hover:scale-110 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationItem;