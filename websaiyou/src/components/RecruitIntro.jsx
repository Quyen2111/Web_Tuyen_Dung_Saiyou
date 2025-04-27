import React from 'react';
import { Link } from 'react-router-dom';

const RecruitIntro = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Tìm hiểu về tuyển dụng là gì?
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        Tuyển dụng là quá trình thu hút, sàng lọc, phỏng vấn và tuyển chọn ứng viên phù hợp để tuyển dụng vào các vị trí cần thiết trong công ty. Đây là một trong những nhiệm vụ quan trọng của mỗi doanh nghiệp để đảm bảo chất lượng nhân sự, giúp công ty phát triển bền vững. Khi tuyển dụng, các doanh nghiệp cần xác định nhu cầu nhân sự, đánh giá tuyển dụng, thu thập thông tin ứng viên, thực hiện phỏng vấn và đánh giá để xác định ứng viên phù hợp nhất. Sau đó, cần chăm sóc nhân viên để họ gắn bó lâu dài với công ty, giúp công ty phát triển bền vững hơn.
      </p>
      <div className="flex justify-between mt-4">
        <Link to="/about" className="text-blue-600 hover:underline text-sm">
          Xem tất cả &gt;
        </Link>
        <Link to="/about" className="text-blue-600 hover:underline text-sm">
          Xem chi tiết &gt;
        </Link>
      </div>
    </div>
  );
};

export default RecruitIntro;