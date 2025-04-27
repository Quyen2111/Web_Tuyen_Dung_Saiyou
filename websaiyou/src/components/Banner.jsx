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
      className="py-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between w-full gap-6"
      style={{
        background: 'linear-gradient(to right, #248b0a, rgb(29, 197, 51), rgb(11, 185, 49), #33cc33, rgb(23, 212, 23), rgb(87, 219, 35))',
      }}
    >
      <div className="text-white w-full lg:w-2/3 max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
            TÌM KIẾM VIỆC LÀM
          </h1>
          <p className="text-base sm:text-lg font-medium opacity-90">
            Việc làm mới nhất, đầy đủ ngành nghề, khu vực
          </p>
        </div>
        <p className="text-lg sm:text-xl font-semibold mb-8 text-center">
          <span className="text-yellow-300">{prefix}</span>
          <span className="text-white">{` ${suffix}`}</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            placeholder="Nhập Tên Công Việc"
            className="px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 w-full sm:min-w-[200px]"
          />
          <select className="px-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 w-full sm:min-w-[150px]">
            <option>Tất Cả Ngành Nghề</option>
          </select>
          <select className="px-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 w-full sm:min-w-[150px]">
            <option>Tất Cả Khu Vực</option>
          </select>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-800 cursor-pointer w-full sm:min-w-[120px]">
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="mt-6 lg:mt-0 w-full lg:w-1/3 max-w-sm">
        <img
          src="./img/banner0.jpg"
          alt="Job Search Illustration"
          className="w-full h-auto rounded-lg shadow-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;