import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import JobList from '../components/JobList';
import JobFilter from '../components/JobFilter';
import { fetchJobs } from '../api';
import RecruitIntro from '../components/RecruitIntro';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      setJobs(data.slice(0, 5)); // Chỉ lấy 5 công việc đầu cho trang chủ
      setLoading(false);
    };
    getJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <Slider />
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg animate-pulse">Đang tải công việc...</p>
        </div>
      ) : (
        <div className="max-w-10xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Danh sách công việc */}
          <div className="col-span-1 md:col-span-2">
            <JobList jobs={jobs} />
            <div className="text-right p-4">
              <Link
                to="/jobs"
                className="text-blue-600 hover:underline font-medium transition-all duration-300 hover:text-blue-800"
              >
                Xem tất cả ➔
              </Link>
            </div>
          </div>

          {/* JobFilter */}
          <div className="flex flex-col gap-4 space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform transition-all duration-500 animate-slideInRight">
              <JobFilter />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transform transition-all duration-500 animate-slideInRight">
              <RecruitIntro />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;