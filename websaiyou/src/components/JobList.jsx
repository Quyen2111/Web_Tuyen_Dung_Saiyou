import React from 'react';
import JobListItem from './JobListItem';
import JobFilter from './JobFilter';
import RecruitIntro from './RecruitIntro';

const jobs = [
  {
    logo: 'https://via.placeholder.com/100?text=Logo+1',
    company: 'CÔNG TY PHÁT TRIỂN CHƯƠNG TRÌNH (Dịch - Biên Tập)',
    title: 'TOÀN THỜI GIAN GIAO DỊCH FPT',
    salary: 'Trên 11 triệu VND',
    location: 'Hà Nội',
  },
  {
    logo: 'https://via.placeholder.com/100?text=Logo+2',
    company: 'CÔNG TY TNHH ĐÔNG HÙI',
    title: 'KẾ TOÁN TỔNG HỢP',
    salary: '15 triệu VND',
    location: 'Hà Nội',
  },
  {
    logo: 'https://via.placeholder.com/100?text=Logo+3',
    company: 'CÔNG TY OPPO VIỆT NAM',
    title: 'NHÂN VIÊN BÁN HÀNG Q12, GÒ VẤP, HÓC MÔN, CỦ CHI - TPHCM',
    salary: '7-15 triệu VND',
    location: 'Hồ Chí Minh',
  },
  {
    logo: 'https://via.placeholder.com/100?text=Logo+4',
    company: 'CÔNG TY OPPO VIỆT NAM',
    title: 'Nhân Viên Phụ Kho (Quận Thủ Đức, Quận 9)',
    salary: '13 triệu VND',
    location: 'Hồ Chí Minh',
  },
  {
    logo: 'https://via.placeholder.com/100?text=Logo+5',
    company: 'TẬP ĐOÀN GIAO DỊCH RECB',
    title: 'NHÂN VIÊN KẾ TOÁN TỔNG HỢP (QUẬN 3)',
    salary: '7-12 triệu VND',
    location: 'Hồ Chí Minh',
  },
];

const JobList = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Việc làm mới nhất
      </h2>

      {/* Container chính */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Danh sách công việc */}
        <div className="w-full lg:w-2/3">
          {jobs.map((job, index) => (
            <JobListItem
              key={index}
              logo={job.logo}
              company={job.company}
              title={job.title}
              salary={job.salary}
              location={job.location}
            />
          ))}
        </div>

        {/* Bộ lọc (bên phải) */}
        <JobFilter />
      </div>

      {/* Phần giới thiệu tuyển dụng */}
      <RecruitIntro />
    </div>
  );
};

export default JobList;