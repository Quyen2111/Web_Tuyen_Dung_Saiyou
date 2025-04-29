import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="./img/logo.jpg"
              alt="Job Search Logo"
              className="h-auto w-16 sm:w-20 lg:w-24 max-w-full"
            />
            <span className="ml-2 text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
              JOB SEARCH
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation (Desktop) */}
      <nav className="hidden md:flex gap-4 space-x-4 lg:space-x-6 items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium text-sm lg:text-base">
          Trang Chủ
        </Link>
        <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium text-sm lg:text-base">
          Việc Làm
        </Link>
        <Link to="/resume" className="text-gray-600 hover:text-blue-600 font-medium text-sm lg:text-base">
          Hồ sơ & CV
        </Link>
        <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium text-sm lg:text-base">
          Giới Thiệu
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium text-sm lg:text-base">
          Liên Hệ
        </Link>
      </nav>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
        <Link
          to="/login"
          className="text-blue-600 cursor-pointer border border-blue-600 px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-50 text-sm lg:text-base"
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 cursor-pointer text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-700 text-sm lg:text-base"
        >
          Đăng ký
        </Link>
        <div className="border-l-2 border-gray-200 pl-2 sm:pl-4">
          <span className="text-gray-600 font-medium text-sm lg:text-base">
            Nhà Tuyển Dụng
          </span>
        </div>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Sidebar) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-100 z-50 flex flex-col">
          {/* Header of Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src="./img/logo.jpg"
                alt="Job Search Logo"
                className="h-auto w-16 max-w-full"
              />
              <span className="ml-2 text-lg font-bold text-gray-800">JOB SEARCH</span>
            </div>
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium text-base"
              onClick={toggleMenu}
            >
              Trang Chủ
            </Link>
            <Link
              to="/jobs"
              className="text-gray-600 hover:text-blue-600 font-medium text-base"
              onClick={toggleMenu}
            >
              Việc Làm
            </Link>
            <Link
              to="/resume"
              className="text-gray-600 hover:text-blue-600 font-medium text-base"
              onClick={toggleMenu}
            >
              Hồ sơ & CV
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 font-medium text-base"
              onClick={toggleMenu}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 font-medium text-base"
              onClick={toggleMenu}
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Buttons in Sidebar */}
          <div className="flex flex-col p-4 space-y-4">
            <Link
              to="/login"
              className="text-blue-600 cursor-pointer border border-blue-600 px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-50 text-sm lg:text-base"
              onClick={toggleMenu}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 cursor-pointer text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-700 text-sm lg:text-base"
              onClick={toggleMenu}
            >
              Đăng ký
            </Link>
            <div className="pt-2">
              <span className="text-gray-600 font-medium text-base">
                Chào Nhà Tuyển Dụng
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
