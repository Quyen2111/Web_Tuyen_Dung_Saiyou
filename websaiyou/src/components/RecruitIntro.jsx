import React from 'react';
import { Link } from 'react-router-dom';

const RecruitIntro = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="bg-green-600 text-white text-lg font-bold px-4 py-3">
        Tìm hiểu về tuyển dụng
      </div>
      <div className="px-4 py-3 space-y-2 text-sm text-gray-800 leading-relaxed">
        <p className="font-semibold text-blue-700">Tuyển dụng là gì?</p>
        <p>
          Tuyển dụng là quá trình thu hút, sàng lọc, phỏng vấn và tuyển chọn ứng viên
          cho các vị trí còn trống nhằm đáp ứng nhu cầu về nguồn nhân lực cho doanh nghiệp.
        </p>
        <Link
          to="/about"
          className="inline-block text-blue-600 font-medium hover:text-blue-800 transition duration-200"
        >
          Xem chi tiết ➔
        </Link>
      </div>
    </div>
  );
};

export default RecruitIntro;
