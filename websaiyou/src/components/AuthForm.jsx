import React, { useState, useContext, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const userType = location.pathname.includes('jobseeker') ? 'jobseeker' : 'employer';
  const isLogin = location.pathname.includes('login');

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    const API_URL = 'https://681350dd129f6313e210e6a8.mockapi.io/users';

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
        setMessageType('error');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL);
        const users = await response.json();

        const user = users.find(
          (u) => u.email === formData.email && u.userType === userType
        );

        if (!user) {
          setMessage('Email không tồn tại hoặc loại người dùng không đúng.');
          setMessageType('error');
          setIsLoading(false);
          return;
        }

        if (user.password !== formData.password) {
          setMessage('Mật khẩu không đúng.');
          setMessageType('error');
          setIsLoading(false);
          return;
        }

        login(user, userType);
        setMessage(`Đăng nhập thành công (${userType === 'jobseeker' ? 'Người tìm việc' : 'Nhà tuyển dụng'})!`);
        setMessageType('success');
        navigate(userType === 'jobseeker' ? '/jobs' : '/employer/jobs');
      } catch (error) {
        setMessage('Lỗi hệ thống. Vui lòng thử lại.');
        setMessageType('error');
      } finally {
        setIsLoading(false);
      }
    } else {
      if (userType === 'jobseeker') {
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
          setMessage('Vui lòng nhập đầy đủ thông tin.');
          setMessageType('error');
          setIsLoading(false);
          return;
        }
      } else {
        if (!formData.companyName || !formData.email || !formData.password || !formData.confirmPassword) {
          setMessage('Vui lòng nhập đầy đủ thông tin.');
          setMessageType('error');
          setIsLoading(false);
          return;
        }
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage('Mật khẩu xác nhận không khớp.');
        setMessageType('error');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL);
        const users = await response.json();

        const emailExists = users.some((u) => u.email === formData.email);

        if (emailExists) {
          setMessage('Email đã tồn tại.');
          setMessageType('error');
          setIsLoading(false);
          return;
        }

        const postResponse = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: userType === 'jobseeker' ? formData.fullName : '',
            companyName: userType === 'employer' ? formData.companyName : '',
            email: formData.email,
            password: formData.password,
            userType,
          }),
        });

        if (postResponse.ok) {
          setMessage('Đăng ký thành công! Chuyển hướng đến đăng nhập...');
          setMessageType('success');
          setTimeout(() => {
            navigate(userType === 'jobseeker' ? '/jobseeker/login' : '/employer/login');
          }, 2000);
        } else {
          setMessage('Đăng ký thất bại.');
          setMessageType('error');
        }
      } catch (error) {
        setMessage('Lỗi hệ thống. Vui lòng thử lại.');
        setMessageType('error');
      } finally {
        setIsLoading(false);
      }
    }

    if (messageType === 'success') {
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  // Tự động đóng thông báo sau 3 giây
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse pointer-events-none" />
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-zoomIn">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex justify-center mb-8 relative">
          <div className="inline-flex rounded-xl bg-gray-100 p-1 shadow-inner">
            <Link
              to={isLogin ? '/jobseeker/login' : '/jobseeker/register'}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform ${
                userType === 'jobseeker'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200 hover:scale-95'
              }`}
            >
              Người tìm việc
            </Link>
            <Link
              to={isLogin ? '/employer/login' : '/employer/register'}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform ${
                userType === 'employer'
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200 hover:scale-95'
              }`}
            >
              Nhà tuyển dụng
            </Link>
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-6 animate-fadeIn">
          {userType === 'jobseeker'
            ? isLogin
              ? 'Đăng nhập - Người tìm việc'
              : 'Đăng ký - Người tìm việc'
            : isLogin
            ? 'Đăng nhập - Nhà tuyển dụng'
            : 'Đăng ký - Nhà tuyển dụng'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {userType === 'jobseeker' ? 'Họ tên' : 'Tên công ty'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name={userType === 'jobseeker' ? 'fullName' : 'companyName'}
                  value={userType === 'jobseeker' ? formData.fullName : formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                  placeholder={userType === 'jobseeker' ? 'Nhập họ tên' : 'Nhập tên công ty'}
                  disabled={isLoading}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          )}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                placeholder="Nhập email"
                disabled={isLoading}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                placeholder="Nhập mật khẩu"
                disabled={isLoading}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m-6 4h12" />
              </svg>
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m-4.495 7.5l16.97-16.97m-4.497 7.5a9.97 9.97 0 011.563 3.029c-.738 2.095-2.53 3.752-4.498 4.47M12 5c.797 0 1.584.107 2.342.315m4.66 2.156A10.05 10.05 0 0112 5c-4.478 0-8.268 2.943-9.543 7a9.97 9.97 0 001.563 3.029m4.66-2.156A10.05 10.05 0 0112 5c.797 0 1.584.107 2.342.315" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {!isLogin && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                  placeholder="Xác nhận mật khẩu"
                  disabled={isLoading}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m-6 4h12" />
                </svg>
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 focus:outline-none"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m-4.495 7.5l16.97-16.97m-4.497 7.5a9.97 9.97 0 011.563 3.029c-.738 2.095-2.53 3.752-4.498 4.47M12 5c.797 0 1.584.107 2.342.315m4.66 2.156A10.05 10.05 0 0112 5c-4.478 0-8.268 2.943-9.543 7a9.97 9.97 0 001.563 3.029m4.66-2.156A10.05 10.05 0 0112 5c.797 0 1.584.107 2.342.315" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.32 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.47 7.76 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.76 1 4 3.53 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95"
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#1877F2"
                  d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.728c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953h-1.516c-1.492 0-1.956.93-1.956 1.885v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                />
              </svg>
              Facebook
            </button>
          </div>
        </div>
        {message && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg transform transition-all duration-500 flex items-center ${
              messageType === 'success'
                ? 'bg-green-500 text-white animate-slideInRight'
                : 'bg-red-500 text-white animate-shake'
            }`}
          >
            <span>{message}</span>
            <button
              onClick={() => setMessage('')}
              className="ml-2 text-white hover:text-gray-200 focus:outline-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="text-center mt-6 text-sm">
          <p className="text-gray-600">
            {isLogin ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}
            <Link
              to={
                userType === 'jobseeker'
                  ? isLogin
                    ? '/jobseeker/register'
                    : '/jobseeker/login'
                  : isLogin
                  ? '/employer/register'
                  : '/employer/login'
              }
              className="ml-1 text-blue-600 hover:underline font-medium transition-all duration-300 hover:text-blue-800"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;