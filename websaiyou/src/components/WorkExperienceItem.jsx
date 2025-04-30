import React, { useState } from 'react';

const WorkExperienceItem = ({ experience, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperience, setEditedExperience] = useState(experience);

  const handleSave = () => {
    onUpdate(editedExperience);
    setIsEditing(false);
  };

  const handleAddResponsibility = () => {
    setEditedExperience({
      ...editedExperience,
      responsibilities: [...editedExperience.responsibilities, ''],
    });
  };

  const handleRemoveResponsibility = (index) => {
    setEditedExperience({
      ...editedExperience,
      responsibilities: editedExperience.responsibilities.filter((_, i) => i !== index),
    });
  };

  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...editedExperience.responsibilities];
    updatedResponsibilities[index] = value;
    setEditedExperience({ ...editedExperience, responsibilities: updatedResponsibilities });
  };

  return (
    <div className="border-l-4 border-blue-500 pl-4 transition-all duration-300 hover:shadow-lg hover:bg-blue-50 p-4 rounded-lg mb-4">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedExperience.title}
            onChange={(e) => setEditedExperience({ ...editedExperience, title: e.target.value })}
            placeholder="Chức danh..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editedExperience.company}
            onChange={(e) => setEditedExperience({ ...editedExperience, company: e.target.value })}
            placeholder="Công ty..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editedExperience.duration}
            onChange={(e) => setEditedExperience({ ...editedExperience, duration: e.target.value })}
            placeholder="Thời gian (VD: 07/2020 - Hiện tại)..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="space-y-1">
            {editedExperience.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  placeholder="Trách nhiệm..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleRemoveResponsibility(index)}
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
            ))}
            <button
              onClick={handleAddResponsibility}
              className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
            >
              + Thêm trách nhiệm
            </button>
          </div>
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
          <h3 className="text-lg font-semibold text-gray-800">{experience.title}</h3>
          <p className="text-sm text-gray-600">{experience.company} • {experience.duration}</p>
          <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
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

export default WorkExperienceItem;