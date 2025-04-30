import React, { useState } from 'react';

const ReferenceItem = ({ reference, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReference, setEditedReference] = useState(reference);

  const handleSave = () => {
    onUpdate(editedReference);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-2 transition-all duration-300 transform hover:scale-101 hover:shadow-md">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedReference.name}
            onChange={(e) => setEditedReference({ ...editedReference, name: e.target.value })}
            placeholder="Tên..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editedReference.organization}
            onChange={(e) => setEditedReference({ ...editedReference, organization: e.target.value })}
            placeholder="Tổ chức..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editedReference.score}
            onChange={(e) => setEditedReference({ ...editedReference, score: e.target.value })}
            placeholder="Điểm số..."
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
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-800 font-medium">{reference.name}</p>
            <p className="text-gray-600 text-sm">{reference.organization}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-blue-600 font-semibold">{reference.score}</p>
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

export default ReferenceItem;