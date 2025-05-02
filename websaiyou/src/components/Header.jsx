import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userType, logout } = useContext(AuthContext);

  const isEmployer = location.pathname.startsWith('/employer');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleJobsDropdown = () => {
    setIsJobsDropdownOpen(!isJobsDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      logout();
      navigate(userType === 'jobseeker' ? '/jobseeker/login' : '/employer/login');
    }
    setIsUserDropdownOpen(false);
  };

  const userName = userType === 'jobseeker' ? user?.fullName : user?.companyName;

  const industries = [
    { name: 'Bán hàng', value: 'sales' },
    { name: 'Kế toán', value: 'accounting' },
    { name: 'Kinh doanh', value: 'business' },
    { name: 'Kỹ sư', value: 'engineering' },
    { name: 'IT - Phần mềm', value: 'it' },
    { name: 'Nghề Khác', value: 'other' },
  ];

  const locations = [
    { name: 'TP.HCM', value: 'hcm' },
    { name: 'Hà Nội', value: 'hanoi' },
    { name: 'Bình Dương', value: 'binh-duong' },
    { name: 'Đà Nẵng', value: 'da-nang' },
    { name: 'Đồng Nai', value: 'dong-nai' },
  ];

  return (
    <header className="bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full sticky top-0 z-50">
      <div className="flex items-center animate-fadeIn">
        <Link to={isEmployer ? '/employer' : '/'}>
          <div className="flex items-center transition-transform hover:scale-105">
            <img
              src="/img/logo.jpg"
              alt="Job Search Logo"
              className="h-auto w-16 sm:w-20 lg:w-24 max-w-full"
            />
            <span className="ml-3 text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
              JOB SEARCH
            </span>
          </div>
        </Link>
      </div>

      <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
        {isEmployer ? (
          <>
            <Link
              to="/employer/jobs"
              className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
            >
              Tìm ứng viên
            </Link>
            <Link
              to="/employer/post-job"
              className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
            >
              Đăng tin tuyển dụng
            </Link>
            <Link
              to="/employer/services"
              className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
            >
              Quản lý tin tuyển dụng
            </Link>
            <Link
              to="/employer/contact"
              className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
            >
              Liên hệ
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium text-base lg:text-lg transition-colors duration-200 animate-slideUp"
            >
              Trang Chủ
            </Link>

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

              {isJobsDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-96 bg-white shadow-xl rounded-lg z-50 p-6 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Ngành Nghề
                      </h4>
                      <ul className="space-y-2">
                        {industries.map((industry) => (
                          <li key={industry.value}>
                            <Link
                              to={`/jobs/industry/${industry.value}`}
                              className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors duration-200"
                              onClick={() => setIsJobsDropdownOpen(false)}
                            >
                              {industry.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Khu Vực
                      </h4>
                      <ul className="space-y-2">
                        {locations.map((location) => (
                          <li key={location.value}>
                            <Link
                              to={`/jobs/location/${location.value}`}
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
              Liên hệ
            </Link>
          </>
        )}
      </nav>

      <div className="hidden md:flex items-center space-x-3 lg:space-x-4 animate-slideInRight">
        {user ? (
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleUserDropdown}
            >
              <img
                src="/img/avatar.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
              <span className="text-gray-700 font-medium text-sm lg:text-base">
                {userName || 'Người dùng'}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  isUserDropdownOpen ? 'rotate-180' : ''
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
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 py-2 animate-fadeIn">
                <div className="px-4 py-2 text-gray-600 text-sm border-b border-gray-200">
                  Xin chào, {userName || 'Người dùng'}!
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium text-sm transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : isEmployer ? (
          <>
            <Link
              to="/employer/login"
              className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white font-medium text-sm lg:text-base transition-all duration-300"
            >
              Đăng nhập
            </Link>
            <Link
              to="/employer/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-medium text-sm lg:text-base transition-all duration-300"
            >
              Đăng ký
            </Link>
            <div className="border-l-2 border-gray-300 pl-3 lg:pl-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium text-sm lg:text-base transition-colors duration-200"
              >
                Dành cho ứng viên
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/jobseeker/login"
              className="text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white font-medium text-sm lg:text-base transition-all duration-300"
            >
              Đăng nhập
            </Link>
            <Link
              to="/jobseeker/register"
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
          </>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col transform transition-transform duration-300 animate-slideInRight">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src="/img/logo.jpg"
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

          <nav className="flex flex-col p-5 space-y-4">
            {isEmployer ? (
              <>
                <Link
                  to="/employer/jobs"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                  onClick={toggleMenu}
                >
                  Tìm ứng viên
                </Link>
                <Link
                  to="/employer/post-job"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                  onClick={toggleMenu}
                >
                  Đăng tin tuyển dụng
                </Link>
                <Link
                  to="/employer/services"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                  onClick={toggleMenu}
                >
                  Quản lý tin tuyển dụng
                </Link>
                <Link
                  to="/employer/contact"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                  onClick={toggleMenu}
                >
                  Liên hệ
                </Link>
                {!user && (
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                    onClick={toggleMenu}
                  >
                    Dành cho ứng viên
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                  onClick={toggleMenu}
                >
                  Trang Chủ
                </Link>

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

                  {isJobsDropdownOpen && (
                    <div className="pl-4 pt-3 space-y-3 animate-slideUp">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                          Ngành Nghề
                        </h4>
                        <ul className="space-y-2">
                          {industries.map((industry) => (
                            <li key={industry.value}>
                              <Link
                                to={`/jobs/industry/${industry.value}`}
                                className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                                onClick={toggleMenu}
                              >
                                {industry.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                          Khu Vực
                        </h4>
                        <ul className="space-y-2">
                          {locations.map((location) => (
                            <li key={location.value}>
                              <Link
                                to={`/jobs/location/${location.value}`}
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
                {!user && (
                  <Link
                    to="/employer"
                    className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-fadeIn"
                    onClick={toggleMenu}
                  >
                    Nhà Tuyển Dụng
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex flex-col p-5 space-y-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src="/img/avatar.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium text-lg">
                    {userName || 'Người dùng'}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center text-red-600 hover:text-red-700 font-medium text-lg transition-colors duration-200 animate-slideInRight"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : isEmployer ? (
              <>
                <Link
                  to="/employer/register"
                  className="bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 font-medium text-lg transition-all duration-300 animate-slideInRight"
                  onClick={toggleMenu}
                >
                  Đăng ký
                </Link>
                <Link
                  to="/employer/login"
                  className="text-blue-600 border-2 border-blue-600 px-5 py-3 rounded-full hover:bg-blue-600 hover:text-white font-medium text-lg transition-all duration-300 animate-slideInRight"
                  onClick={toggleMenu}
                >
                  Đăng nhập
                </Link>
                <div className="pt-2">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 animate-slideInRight"
                    onClick={toggleMenu}
                  >
                    Dành cho ứng viên
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/jobseeker/register"
                  className="bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 font-medium text-lg transition-all duration-300 animate-slideInRight"
                  onClick={toggleMenu}
                >
                  Đăng ký
                </Link>
                <Link
                  to="/jobseeker/login"
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
                    Nhà Tuyển Dụng
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;