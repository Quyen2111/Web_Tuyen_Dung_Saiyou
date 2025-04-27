import React, { useState, useEffect } from 'react';

const messages = [
  "Việc làm mới dành cho bạn.",
  "CV mới dành cho bạn.",
  "Công ty phù hợp dành cho bạn.",
  "Định hướng nghề nghiệp dành cho bạn.",
  "Phúc lợi tốt dành cho bạn.",
  "Mức lương cao dành cho bạn.",
];

const Banner = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Hàm tách thông điệp thành hai phần
  const splitMessage = (message) => {
    const parts = message.split(' dành cho bạn.');
    return {
      prefix: parts[0],
      suffix: 'dành cho bạn.',
    };
  };

  const { prefix, suffix } = splitMessage(currentMessage);

  return (
    <div
      className="relative py-12 px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between w-full gap-8 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #1a7d0a 0%, #2ecc71 30%, #27ae60 60%, #33cc33 80%, #2ecc71 100%)',
      }}
    >
      {/* Hiệu ứng ánh sáng nền */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Nội dung bên trái */}
      <div className="relative text-white w-full lg:w-2/3 max-w-5xl z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-tight animate-fadeIn">
            TÌM KIẾM VIỆC LÀM
          </h1>
          <p className="text-lg sm:text-xl font-medium opacity-90 animate-slideUp">
            Việc làm mới nhất, đầy đủ ngành nghề, khu vực
          </p>
        </div>

        {/* Thông điệp luân phiên */}
        <p className="text-xl sm:text-2xl font-semibold mb-10 text-center animate-pulse">
          <span className="text-yellow-200 drop-shadow-lg">{prefix}</span>
          <span className="text-white drop-shadow-lg">{` ${suffix}`}</span>
        </p>

        {/* Form tìm kiếm */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Nhập Tên Công Việc"
            className="px-5 py-3 rounded-full bg-white/90 text-gray-800 placeholder-gray-500 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 w-full sm:min-w-[250px] hover:shadow-lg"
          />
          <select
            className="px-5 py-3 rounded-full bg-white/90 text-gray-800 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 w-full sm:min-w-[200px] hover:shadow-lg"
          >
            <option>Tất Cả Ngành Nghề</option>
            <option>Bán hàng</option>
            <option>Kế toán</option>
            <option>Kỹ sư</option>
            <option>IT - Phần mềm</option>
          </select>
          <select
            className="px-5 py-3 rounded-full bg-white/90 text-gray-800 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 w-full sm:min-w-[200px] hover:shadow-lg"
          >
            <option>Tất Cả Khu Vực</option>
            <option>TP.HCM</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Bình Dương</option>
          </select>
          <button
            className="bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-800 hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:min-w-[150px]"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Hình ảnh bên phải */}
      <div className="relative mt-8 lg:mt-0 w-full lg:w-1/3 max-w-md animate-slideInRight">
        <img
          src="./img/banner0.jpg"
          alt="Job Search Illustration"
          className="w-full h-auto rounded-2xl shadow-2xl object-contain transform hover:scale-105 transition-transform duration-500"
        />
        {/* Hiệu ứng ánh sáng cho hình ảnh */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default Banner;