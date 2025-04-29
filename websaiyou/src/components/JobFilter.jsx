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
   <>
      {/* Việc làm theo khu vực */}
      <div className="mb-6">
        <h3 className="bg-green-600 text-white p-2 font-bold rounded-t-md">
          Việc làm theo khu vực
        </h3>
        <ul className="bg-white border border-gray-300 rounded-b-md p-2">
          {areas.map((area, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-blue-500 hover:underline"
              >
                &gt; {area}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Việc làm theo ngành nghề */}
      <div>
        <h3 className="bg-green-600 text-white p-2 font-bold rounded-t-md">
          Việc làm theo ngành nghề
        </h3>
        <ul className="bg-white border border-gray-300 rounded-b-md p-2">
          {industries.map((industry, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-blue-500 hover:underline"
              >
                &gt; {industry}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default JobFilter;   