import React from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

const JobFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const locations = [
    { name: 'TP.HCM', value: 'hcm' },
    { name: 'Hà Nội', value: 'hanoi' },
    { name: 'Bình Dương', value: 'binh-duong' },
    { name: 'Đà Nẵng', value: 'da-nang' },
    { name: 'Đồng Nai', value: 'dong-nai' },
  ];

  const industries = [
    { name: 'Bán hàng', value: 'sales' },
    { name: 'Kế toán', value: 'accounting' },
    { name: 'Kinh doanh', value: 'business' },
    { name: 'Kỹ sư', value: 'engineering' },
    { name: 'IT - Phần mềm', value: 'it' },
    { name: 'Nghề Khác', value: 'other' },
  ];

  // Lấy giá trị hiện tại của industry và location từ query params
  const currentIndustry = searchParams.get('industry') || '';
  const currentLocation = searchParams.get('location') || '';

  // Hàm xử lý khi click vào khu vực
  const handleLocationClick = (locationValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (currentLocation === locationValue) {
      // Nếu đã chọn, bấm lần nữa sẽ bỏ chọn
      newParams.delete('location');
    } else {
      // Nếu chưa chọn, bấm sẽ chọn
      newParams.set('location', locationValue);
    }

    // Kiểm tra nếu đang ở HomePage (URL không bắt đầu bằng /jobs)
    const isHomePage = location.pathname === '/';
    if (isHomePage) {
      // Chuyển hướng đến /jobs với query parameters
      navigate(`/jobs${newParams.toString() ? `?${newParams.toString()}` : ''}`);
    } else {
      // Nếu đang ở JobsPage, chỉ cập nhật query params
      setSearchParams(newParams);
    }
  };

  // Hàm xử lý khi click vào ngành nghề
  const handleIndustryClick = (industryValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (currentIndustry === industryValue) {
      // Nếu đã chọn, bấm lần nữa sẽ bỏ chọn
      newParams.delete('industry');
    } else {
      // Nếu chưa chọn, bấm sẽ chọn
      newParams.set('industry', industryValue);
    }

    // Kiểm tra nếu đang ở HomePage (URL không bắt đầu bằng /jobs)
    const isHomePage = location.pathname === '/';
    if (isHomePage) {
      // Chuyển hướng đến /jobs với query parameters
      navigate(`/jobs${newParams.toString() ? `?${newParams.toString()}` : ''}`);
    } else {
      // Nếu đang ở JobsPage, chỉ cập nhật query params
      setSearchParams(newParams);
    }
  };

  return (
    <div className="space-y-6">
      {/* Việc làm theo khu vực */}
      <div className="transform transition-all duration-500 animate-slideInRight">
        <h3 className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 font-bold rounded-t-lg shadow-md text-lg">
          Việc làm theo khu vực
        </h3>
        <ul className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-inner">
          {locations.map((location) => (
            <li key={location.value}>
              <button
                onClick={() => handleLocationClick(location.value)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-50 ${
                  currentLocation === location.value
                    ? 'text-green-700 font-semibold bg-green-100'
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
               {location.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Việc làm theo ngành nghề */}
      <div className="transform transition-all duration-500 animate-slideInRight">
        <h3 className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 font-bold rounded-t-lg shadow-md text-lg">
          Việc làm theo ngành nghề
        </h3>
        <ul className="bg-white border border-gray-200 rounded-b-lg p-4 shadow-inner">
          {industries.map((industry) => (
            <li key={industry.value}>
              <button
                onClick={() => handleIndustryClick(industry.value)}
                className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-50 ${
                  currentIndustry === industry.value
                    ? 'text-green-700 font-semibold bg-green-100'
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
               {industry.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobFilter;