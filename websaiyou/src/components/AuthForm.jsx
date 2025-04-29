import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const AuthForm = () => {
  const location = useLocation();
  const userType = location.pathname.includes('jobseeker') ? 'jobseeker' : 'employer';
  const isLogin = location.pathname.includes('login');

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(''); // Thông báo
  const [messageType, setMessageType] = useState(''); // Loại thông báo: 'success' hoặc 'error'

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (isLogin) {
      // Xử lý đăng nhập
      if (!formData.email || !formData.password) {
        setMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
        setMessageType('error');
        return;
      }
      setMessage(`Đăng nhập thành công (${userType === 'jobseeker' ? 'Người tìm việc' : 'Nhà tuyển dụng'})!`);
      setMessageType('success');
      console.log(`Đăng nhập (${userType})`, { email: formData.email, password: formData.password });
    } else {
      // Xử lý đăng ký
      if (userType === 'jobseeker') {
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
          setMessage('Vui lòng nhập đầy đủ thông tin.');
          setMessageType('error');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setMessage('Mật khẩu xác nhận không khớp.');
          setMessageType('error');
          return;
        }
        setMessage('Đăng ký thành công (Người tìm việc)!');
        setMessageType('success');
        console.log('Đăng ký (Jobseeker)', {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
      } else {
        if (!formData.companyName || !formData.email || !formData.password || !formData.confirmPassword) {
          setMessage('Vui lòng nhập đầy đủ thông tin.');
          setMessageType('error');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setMessage('Mật khẩu xác nhận không khớp.');
          setMessageType('error');
          return;
        }
        setMessage('Đăng ký thành công (Nhà tuyển dụng)!');
        setMessageType('success');
        console.log('Đăng ký (Employer)', {
          companyName: formData.companyName,
          email: formData.email,
          password: formData.password,
        });
      }
    }

    // Reset form sau khi submit thành công
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

  // Xử lý đăng nhập bằng Google
  const handleGoogleLogin = () => {
    setMessage('');
    setMessageType('');
    setMessage(`Đăng ${isLogin ? 'nhập' : 'ký'} bằng Google (${userType === 'jobseeker' ? 'Người tìm việc' : 'Nhà tuyển dụng'})!`);
    setMessageType('success');
    console.log(`Đăng ${isLogin ? 'nhập' : 'ký'} bằng Google (${userType})`);
  };

  // Xử lý đăng nhập bằng Facebook
  const handleFacebookLogin = () => {
    setMessage('');
    setMessageType('');
    setMessage(`Đăng ${isLogin ? 'nhập' : 'ký'} bằng Facebook (${userType === 'jobseeker' ? 'Người tìm việc' : 'Nhà tuyển dụng'})!`);
    setMessageType('success');
    console.log(`Đăng ${isLogin ? 'nhập' : 'ký'} bằng Facebook (${userType})`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Hiệu ứng nền động */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse pointer-events-none" />

      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 animate-zoomIn">
        {/* Tab chọn Jobseeker/Employer */}
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

        {/* Tiêu đề */}
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-6 animate-fadeIn">
          {userType === 'jobseeker'
            ? isLogin
              ? 'Đăng nhập - Người tìm việc'
              : 'Đăng ký - Người tìm việc'
            : isLogin
            ? 'Đăng nhập - Nhà tuyển dụng'
            : 'Đăng ký - Nhà tuyển dụng'}
        </h2>

        {/* Form */}
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                placeholder="Nhập mật khẩu"
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
            </div>
          </div>

          {!isLogin && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                  placeholder="Xác nhận mật khẩu"
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
              </div>
            </div>
          )}

          {/* Nút submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        {/* Đăng nhập bằng Google/Facebook */}
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
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95"
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
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95"
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

        {/* Thông báo */}
        {message && (
          <div
            className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg transform transition-all duration-500 ${
              messageType === 'success'
                ? 'bg-green-500 text-white animate-slideInRight'
                : 'bg-red-500 text-white animate-shake'
            }`}
          >
            {message}
          </div>
        )}

        {/* Chuyển đổi giữa đăng nhập và đăng ký */}
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