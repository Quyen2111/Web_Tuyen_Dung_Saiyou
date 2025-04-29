import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobList from '../components/JobList';
import JobFilter from '../components/JobFilter';
import { fetchJobs } from '../api';
import Banner from '../components/Banner';

const ITEMS_PER_PAGE = 8;

const JobsPage = () => {
  const { industry, location } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      setFilteredJobs(data);
      setLoading(false);
    };
    getJobs();
  }, []);

  // Lọc công việc dựa trên industry, location và search query
  useEffect(() => {
    const filterJobs = async () => {
      let filtered = await fetchJobs();

      if (industry) {
        filtered = filtered.filter((job) => job.industry === industry);
      }

      if (location) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (searchQuery) {
        filtered = filtered.filter(
          (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredJobs(filtered);
      setCurrentPage(1); // Reset về trang 1 khi lọc thay đổi
    };
    filterJobs();
  }, [industry, location, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  // Phân trang
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Hiệu ứng nền động */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse pointer-events-none" />

      <Banner />

      {/* Danh sách công việc và bộ lọc */}
      <div className="max-w-10xl mx-auto mt-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg animate-pulse">Đang tải công việc...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Danh sách công việc với phân trang */}
            <div className="col-span-1 md:col-span-2">
              <JobList
                jobs={paginatedJobs}
                pagination={
                  <div className="flex justify-center items-center space-x-2 mt-6 p-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      &lt;
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 ${
                          currentPage === index + 1
                            ? 'bg-blue-600 text-white shadow-lg scale-110'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      &gt;
                    </button>
                  </div>
                }
              />
            </div>

            {/* JobFilter */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform transition-all duration-500 animate-slideInRight">
                <JobFilter />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg animate-fadeIn">
            <p className="text-gray-600 text-lg">Không tìm thấy công việc phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;