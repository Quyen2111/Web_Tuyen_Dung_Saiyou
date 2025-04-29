import React from 'react';
import { Link } from 'react-router-dom';

const RecruitIntro = () => {
  return (
    <>
      <div className="bg-green-600 text-white p-2 font-bold rounded-t-md">
          Tìm hiểu về tuyển dụng
        </div>
        <div className="bg-white border border-gray-300 rounded-b-md p-2 text-sm text-gray-700">
          <p className="font-semibold text-blue-700">Tuyển dụng là gì?</p>
          <p>
            Tuyển dụng là quá trình thu hút, sàng lọc, phỏng vấn và tuyển chọn ứng viên cho các vị trí còn trống, 
            nhằm đáp ứng nhu cầu về nguồn nhân lực cho doanh nghiệp ... 
            
          </p>
            <Link 
              to="/about"
              className="text-blue-500 hover:underline">
              Xem chi tiết ➔
            </Link>
        </div>
    </>
  );
};

export default RecruitIntro;
