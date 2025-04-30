import React, { useState } from "react";
import { MapPin, Phone, Mail } from 'lucide-react';

const EmployerJob = () => {
  // Dữ liệu mẫu cho ứng viên
  const candidates = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Senior Software Engineer",
      location: "Hà Nội",
      experience: "5 năm kinh nghiệm",
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      email: "nguyenvana@gmail.com",
      phone: "0987654321",
      workExperience: [
        {
          title: "Senior Developer",
          company: "Tech Company",
          period: "2023 - Hiện tại",
        },
        {
          title: "Developer",
          company: "Software Inc",
          period: "2020 - 2023",
        },
      ],
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "UI/UX Designer",
      location: "TP HCM",
      experience: "3 năm kinh nghiệm",
      skills: ["Figma", "Adobe XD", "Sketch"],
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      email: "tranthib@gmail.com",
      phone: "0912345678",
      workExperience: [
        {
          title: "Senior UI/UX Designer",
          company: "Design Studio",
          period: "2022 - Hiện tại",
        },
        {
          title: "UI Designer",
          company: "Creative Agency",
          period: "2020 - 2022",
        },
      ],
    },
  ];

  // State để lưu ứng viên được chọn
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);

  // Hàm xử lý khi click vào ứng viên
  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Phần tìm kiếm và danh sách ứng viên */}
      <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
        {/* Thanh tìm kiếm */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Tìm kiếm theo kỹ năng, vị trí..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="relative w-48">
            <select className="w-full appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Tất cả ngành nghề</option>
              <option>Công nghệ thông tin</option>
              <option>Thiết kế</option>
              <option>Marketing</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Tìm kiếm
          </button>
        </div>

        {/* Danh sách ứng viên */}
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedCandidate.id === candidate.id
                  ? "bg-blue-50 border-2 border-blue-500"
                  : "bg-white border border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleCandidateClick(candidate)}
            >
              <div className="flex items-center">
                <img
                  src={candidate.avatar || "/placeholder.svg"}
                  alt={candidate.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{candidate.name}</h3>
                  <p className="text-blue-600 text-sm">{candidate.position}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{candidate.location}</span>
                    <span className="mx-2">•</span>
                    <span>{candidate.experience}</span>
                  </div>
                </div>
              </div>

              {/* Kỹ năng */}
              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phần hiển thị thông tin chi tiết */}
      {selectedCandidate && (
        <div className="hidden md:block md:w-1/2 p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={selectedCandidate.avatar || "/placeholder.svg"}
              alt={selectedCandidate.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h2 className="text-xl font-semibold">{selectedCandidate.name}</h2>
            <p className="text-blue-600">{selectedCandidate.position}</p>
          </div>

          {/* Thông tin cá nhân */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Thông tin cá nhân</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span>{selectedCandidate.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span>{selectedCandidate.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{selectedCandidate.location}</span>
              </div>
            </div>
          </div>

          {/* Kinh nghiệm */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Kinh nghiệm</h3>
            <div className="space-y-3">
              {selectedCandidate.workExperience.map((exp, index) => (
                <div key={index}>
                  <p className="font-medium">
                    {exp.title} - {exp.company}
                  </p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kỹ năng */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Kỹ năng</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCandidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Nút liên hệ */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium">
            Liên hệ ứng viên
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployerJob;