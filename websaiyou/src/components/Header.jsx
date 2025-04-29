import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleJobsDropdown = () => {
    setIsJobsDropdownOpen(!isJobsDropdownOpen);
  };

  const industries = [
    { name: 'Bán hàng', path: '/jobs/industry/sales' },
    { name: 'Kế toán', path: '/jobs/industry/accounting' },
    { name: 'Kinh doanh', path: '/jobs/industry/business' },
    { name: 'Kỹ sư', path: '/jobs/industry/engineering' },
    { name: 'IT - Phần mềm', path: '/jobs/industry/it' },
    { name: 'Nghề Khác', path: '/jobs/industry/other' },
  ];

  const locations = [
    { name: 'TP.HCM', path: '/jobs/location/hcm' },
    { name: 'Hà Nội', path: '/jobs/location/hanoi' },
    { name: 'Bình Dương', path: '/jobs/location/binh-duong' },
    { name: 'Đà Nẵng', path: '/jobs/location/da-nang' },
    { name: 'Đồng Nai', path: '/jobs/location/dong-nai' },
  ];

  return (
    <header className="bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center animate-fadeIn">
        <Link to="/">
          <div className="flex items-center transition-transform hover:scale-105">
            <img
              src="./img/logo.jpg"
              alt="Job Search Logo"
              className="h-auto w-16 sm:w-20 lg:w-24 max-w-full"
            />
            <span className="ml-3 text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              JOB SEARCH
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation (Desktop) */}
      <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
        >
          Trang Chủ
        </Link>

        {/* Việc Làm với Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsJobsDropdownOpen(true)}
          onMouseLeave={() => setIsJobsDropdownOpen(false)}
        >
          <Link
            to="/jobs"
            className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg flex items-center transition-colors duration-200 animate-slideUp"
          >
            Việc Làm
            <svg
              className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
                isJobsDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>

          {/* Dropdown */}
          {isJobsDropdownOpen && (
            <div className="absolute top-full left-0 mt-0 w-96 bg-white shadow-xl rounded-lg z-50 p-6 animate-fadeIn">
              <div className="grid grid-cols-2 gap-6">
                {/* Ngành Nghề */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Ngành Nghề
                  </h4>
                  <ul className="space-y-2">
                    {industries.map((industry) => (
                      <li key={industry.path}>
                        <Link
                          to={industry.path}
                          className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors duration-200"
                          onClick={() => setIsJobsDropdownOpen(false)}
                        >
                          {industry.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Khu Vực */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Khu Vực
                  </h4>
                  <ul className="space-y-2">
                    {locations.map((location) => (
                      <li key={location.path}>
                        <Link
                          to={location.path}
                          className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors duration-200"
                          onClick={() => setIsJobsDropdownOpen(false)}
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/resume"
          className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
        >
          Hồ sơ & CV
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
        >
          Giới Thiệu
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
        >
          Liên Hệ
        </Link>
      </nav>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-3 lg:space-x-4 animate-slideInRight">
        <Link
          to="/login"
          className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white font-medium text-sm lg:text-base transition-all duration-300"
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-medium text-sm lg:text-base transition-all duration-300"
        >
          Đăng ký
        </Link>
        <div className="border-l-2 border-gray-300 pl-3 lg:pl-4">
          <Link
            to="/employer"
            className="text-gray-700 hover:text-blue-600 font-medium text-sm lg:text-base transition-colors duration-200"
          >
            Nhà Tuyển Dụng
          </Link>
        </div>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Sidebar) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight">
          {/* Header của Sidebar */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src="./img/logo.jpg"
                alt="Job Search Logo"
                className="h-auto w-16 max-w-full"
              />
              <span className="ml-3 text-xl font-extrabold text-gray-900">JOB SEARCH</span>
            </div>
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col p-5 space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
              onClick={toggleMenu}
            >
              Trang Chủ
            </Link>

            {/* Việc Làm với Dropdown trên Mobile */}
            <div>
              <div
                className="text-gray-700 hover:text-blue-600 font-medium text-lg flex items-center transition-colors duration-200 animate-fadeIn"
                onClick={toggleJobsDropdown}
              >
                Việc Làm
                <svg
                  className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${
                    isJobsDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown trên Mobile */}
              {isJobsDropdownOpen && (
                <div className="pl-4 pt-3 space-y-3 animate-slideUp">
                  {/* Ngành Nghề */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Ngành Nghề
                    </h4>
                    <ul className="space-y-2">
                      {industries.map((industry) => (
                        <li key={industry.path}>
                          <Link
                            to={industry.path}
                            className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                            onClick={toggleMenu}
                          >
                            {industry.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Khu Vực */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                      Khu Vực
                    </h4>
                    <ul className="space-y-2">
                      {locations.map((location) => (
                        <li key={location.path}>
                          <Link
                            to={location.path}
                            className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                            onClick={toggleMenu}
                          >
                            {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/resume"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
              onClick={toggleMenu}
            >
              Hồ sơ & CV
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
              onClick={toggleMenu}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
              onClick={toggleMenu}
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Buttons in Sidebar */}
          <div className="flex flex-col p-5 space-y-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 font-medium text-lg transition-all duration-300 animate-slideInRight"
              onClick={toggleMenu}
            >
              Đăng ký
            </Link>
            <Link
              to="/login"
              className="text-blue-600 border-2 border-blue-600 px-5 py-3 rounded-full hover:bg-blue-600 hover:text-white font-medium text-lg transition-all duration-300 animate-slideInRight"
              onClick={toggleMenu}
            >
              Đăng nhập
            </Link>
            <div className="pt-2">
              <Link
                to="/employer"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-slideInRight"
                onClick={toggleMenu}
              >
                Chào Nhà Tuyển Dụng
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;