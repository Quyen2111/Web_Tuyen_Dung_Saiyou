"use client"

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function EmployerJob() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(''); // Đổi tên từ searchTitle thành searchText
  const [selectedSkill, setSelectedSkill] = useState(''); // Bộ lọc kỹ năng
  const [selectedLocation, setSelectedLocation] = useState(''); // Bộ lọc địa điểm
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 5;

  const skillColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-red-100 text-red-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
    "bg-cyan-100 text-cyan-700",
    "bg-lime-100 text-lime-700",
    "bg-emerald-100 text-emerald-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
    "bg-violet-100 text-violet-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-rose-100 text-rose-700",
  ];

  // Danh sách tất cả kỹ năng và địa điểm (dùng để tạo dropdown bộ lọc)
  const allSkills = useMemo(() => {
    const skills = candidates
      .flatMap((candidate) => candidate.skill || [])
      .filter((skill, index, self) => skill && self.indexOf(skill) === index)
      .sort();
    return ['Tất cả kỹ năng', ...skills];
  }, [candidates]);

  const allLocations = useMemo(() => {
    const locations = candidates
      .map((candidate) => candidate.address)
      .filter((address, index, self) => address && self.indexOf(address) === index)
      .sort();
    return ['Tất cả địa điểm', ...locations];
  }, [candidates]);

  const skillColorMap = useMemo(() => {
    const colorMap = {};
    allSkills.slice(1).forEach((skill) => {
      const randomIndex = Math.floor(Math.random() * skillColors.length);
      colorMap[skill] = skillColors[randomIndex];
    });
    return colorMap;
  }, [allSkills]);

  const getSkillColor = (skill) => {
    if (skillColorMap[skill]) {
      return skillColorMap[skill];
    }
    const randomIndex = Math.floor(Math.random() * skillColors.length);
    skillColorMap[skill] = skillColors[randomIndex];
    return skillColorMap[skill];
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/CV");

        if (!response.ok) {
          throw new Error(`Lỗi API: ${response.status}`);
        }

        const data = await response.json();
        // Lọc CV có id và title hợp lệ
        const validCandidates = data.filter(candidate => 
          candidate.id && 
          typeof candidate.title === 'string' && 
          candidate.title.trim() !== ''
        );
        setCandidates(validCandidates);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải danh sách ứng viên:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Logic tìm kiếm và lọc
  const filteredCandidates = candidates.filter(candidate => {
    // Kiểm tra tìm kiếm
    const searchTextLower = searchText.toLowerCase();
    const title = candidate.title;
    const name = candidate.name;
    const skills = candidate.skill?.join(' ') || '';
    
    const matchesSearch = (
      (title && typeof title === 'string' && title.toLowerCase().includes(searchTextLower)) ||
      (name && typeof name === 'string' && name.toLowerCase().includes(searchTextLower)) ||
      (skills && typeof skills === 'string' && skills.toLowerCase().includes(searchTextLower))
    );

    // Kiểm tra bộ lọc kỹ năng
    const matchesSkill = selectedSkill === '' || selectedSkill === 'Tất cả kỹ năng' || 
      (candidate.skill && candidate.skill.includes(selectedSkill));

    // Kiểm tra bộ lọc địa điểm
    const matchesLocation = selectedLocation === '' || selectedLocation === 'Tất cả địa điểm' || 
      candidate.address === selectedLocation;

    return matchesSearch && matchesSkill && matchesLocation;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedSkill('');
    setSelectedLocation('');
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
            role="status"
          >
            <span className="sr-only">Đang tải...</span>
          </div>
          <p className="mt-2 text-gray-600">Đang tải danh sách ứng viên...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Lỗi khi tải dữ liệu: {error}</p>
          <p className="mt-2">Vui lòng thử lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Danh Sách Ứng Viên - Senior Frontend Developer
          </h1>
          <p className="text-sm text-gray-500 mt-2">{filteredCandidates.length} ứng viên phù hợp</p>
          <div className="mt-4 space-y-4">
            {/* Ô tìm kiếm */}
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Tìm kiếm theo chức danh, tên hoặc kỹ năng (VD: Kỹ sư phần mềm, React)"
                className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bộ lọc */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Bộ lọc kỹ năng */}
              <div className="flex items-center space-x-2">
                <label htmlFor="skill-filter" className="text-gray-600 font-medium">Lọc theo kỹ năng:</label>
                <select
                  id="skill-filter"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {allSkills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bộ lọc địa điểm */}
              <div className="flex items-center space-x-2">
                <label htmlFor="location-filter" className="text-gray-600 font-medium">Lọc theo địa điểm:</label>
                <select
                  id="location-filter"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {allLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nút reset bộ lọc */}
              {(searchText || selectedSkill || selectedLocation) && (
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
            <p>Không tìm thấy ứng viên phù hợp.</p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {currentCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <img
                      src={candidate.avatar || "https://via.placeholder.com/80"}
                      alt={candidate.name}
                      className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800">{candidate.name || "Chưa có tên"}</h2>
                      <p className="text-lg font-medium text-blue-600">{candidate.title || "Chưa có chức danh"}</p>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span>{candidate.address || "Chưa có địa điểm"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                      Giới Thiệu
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{candidate.introduce || "Chưa có giới thiệu."}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                      Kỹ Năng
                    </h3>
                    {candidate.skill && Array.isArray(candidate.skill) && candidate.skill.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {candidate.skill.map((skill, index) => (
                          <span
                            key={index}
                            className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getSkillColor(skill)}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Chưa có kỹ năng.</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/employer/jobs/${candidate.id}`}
                      className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 hover:scale-105"
                    >
                      Xem CV Chi Tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  
                </button>
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === number
                        ? "bg-blue-600 text-white font-semibold"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}