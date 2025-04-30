import React from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaMapMarkerAlt, FaCalendarAlt, FaUserTie, FaUsers, FaBriefcase, FaGraduationCap, FaClock, FaIndustry } from 'react-icons/fa';

const JobDetail = ({ job }) => {
  // Hình ảnh mặc định nếu logo không tải được
  const defaultLogo = '/img/default-logo.png';

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Thông tin chính của công việc */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo công ty */}
          <div className="flex justify-center md:justify-start">
            <Link to={`/job/${job.id}`}>
              <img
                src={job.logo}
                alt={job.company}
                className="w-full h-50 rounded-lg object-cover shadow-md"
                onError={(e) => (e.target.src = defaultLogo)}
              />
            </Link>
          </div>

          {/* Thông tin công việc */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-gray-600 font-medium">{job.company}</p>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h1>
            <ul className="flex flex-col sm:flex-row gap-4 mb-4">
              <li className="flex items-center text-gray-600">
                <FaDollarSign className="w-5 h-5 mr-2 text-gray-600" />
                Lương: {job.salary}
              </li>
              <li className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-600" />
                {job.location}
              </li>
            </ul>
            <Link to="/resume">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                Nộp CV
              </button>
            </Link>
          </div>

          {/* Hạn nộp hồ sơ */}
          <div className="col-span-1 md:col-span-3 flex justify-between items-center border-t pt-4 mt-4">
            <div className="flex items-center text-gray-600">
              <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-600" />
              Hạn nộp hồ sơ:
            </div>
            <span className="text-gray-800 font-medium">{job.deadline}</span>
          </div>
        </div>
      </div>

      {/* Thông tin chung */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin chung</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center">
            <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Ngày đăng:</span>
              <p className="font-medium">{job.postDate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Thời gian thử việc:</span>
              <p className="font-medium">{job.probationPeriod}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaUserTie className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Cấp bậc:</span>
              <p className="font-medium">{job.level}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaUsers className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Số lượng tuyển:</span>
              <p className="font-medium">{job.quantity}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Hình thức làm việc:</span>
              <p className="font-medium">{job.workType}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaGraduationCap className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Yêu cầu bằng cấp:</span>
              <p className="font-medium">{job.requiredDegree}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaClock className="w-5 h-5 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Yêu cầu kinh nghiệm:</span>
              <p className="font-medium">{job.requiredExperience}</p>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex items-center">
            <FaIndustry className="w-6 h-6 mr-2 text-gray-600" />
            <div>
              <span className="text-gray-600">Ngành nghề:</span>
              <p className="font-medium">{job.industry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mô tả công việc */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mô tả công việc</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {job.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Yêu cầu công việc */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Yêu cầu công việc</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {job.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Quyền lợi */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quyền lợi</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {job.benefits.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Địa điểm làm việc */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Địa điểm làm việc</h2>
        <p className="text-gray-700">{job.workLocation}</p>
      </div>
    </div>
  );
};

export default JobDetail;