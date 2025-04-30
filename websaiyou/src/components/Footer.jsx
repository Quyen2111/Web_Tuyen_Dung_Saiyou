import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
      {/* Gradient nền */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
        }}
      />
      {/* Lớp phủ ánh sáng */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Grid layout cho footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo và thông tin công ty */}
          <div className="col-span-1 animate-fadeIn">
            <div className="flex items-center mb-6">
              <Link to="/">
                <div className="flex items-center transition-transform hover:scale-105">
                  <img
                    src="/img/logo.jpg"
                    alt="Job Search Logo"
                    className="h-auto w-16 max-w-full rounded-lg shadow-md"
                  />
                  <span className="ml-3 text-2xl font-extrabold tracking-tight">
                    JOB SEARCH
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Job Search là nền tảng kết nối ứng viên và nhà tuyển dụng, giúp bạn tìm kiếm cơ hội việc làm phù hợp và phát triển sự nghiệp.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-span-1 animate-slideUp">
            <h3 className="text-lg font-semibold mb-5 text-white tracking-wide">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-all duration-300 hover:underline hover:translate-x-1"
                >
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-all duration-300 hover:underline hover:translate-x-1"
                >
                  Việc Làm
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-all duration-300 hover:underline hover:translate-x-1"
                >
                  Hồ sơ & CV
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-all duration-300 hover:underline hover:translate-x-1"
                >
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-blue-400 text-sm font-medium transition-all duration-300 hover:underline hover:translate-x-1"
                >
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div className="col-span-1 animate-slideUp">
            <h3 className="text-lg font-semibold mb-5 text-white tracking-wide">
              Liên hệ
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:support@jobsearch.vn"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  support@jobsearch.vn
                </a>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+84123456789"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  (+84) 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 text-blue-400"
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
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div className="col-span-1 animate-slideInRight">
            <h3 className="text-lg font-semibold mb-5 text-white tracking-wide">
              Theo dõi chúng tôi
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 transition-transform duration-300"
              >
                <svg
                  className="w-8 h-8 text-gray-300 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 transition-transform duration-300"
              >
                <svg
                  className="w-8 h-8 text-gray-300 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-125 transition-transform duration-300"
              >
                <svg
                  className="w-8 h-8 text-gray-300 hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center animate-fadeIn">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Job Search. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;