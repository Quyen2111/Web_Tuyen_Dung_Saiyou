import React from 'react';

const JobFilter = () => {
  const areas = [
    'TP.HCM',
    'Hà Nội',
    'Đồng Nai',
    'Bình Dương',
    'Đà Nẵng',
  ];

  const industries = [
    'Bán hàng',
    'Kỹ sư, Thiết kế',
    'Kinh doanh',
    'IT - Phần mềm',
    'Kế toán',
    'Nghề khác',
  ];

  return (
    <div className="w-full lg:w-1/3 p-4">
      {/* Việc làm theo khu vực */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Việc làm theo khu vực
        </h3>
        <ul className="space-y-2">
          {areas.map((area, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-blue-600 hover:underline text-sm"
              >
                &gt; {area}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Việc làm theo ngành nghề */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Việc làm theo ngành nghề
        </h3>
        <ul className="space-y-2">
          {industries.map((industry, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-blue-600 hover:underline text-sm"
              >
                &gt; {industry}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobFilter;   