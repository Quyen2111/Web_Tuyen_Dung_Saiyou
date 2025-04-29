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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="col-span-1 md:col-span-2">
        <h2 className="bg-green-600 text-white p-2 font-bold rounded-t-md">Việc làm mới nhất</h2>

        <div className="flex flex-col gap-8">
          {/* List job */}
          <div className="bg-white border border-gray-300 rounded-b-md">
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
            <div className="text-right p-2">
              <a href="#" className="text-blue-500 hover:underline">
                Xem tất cả ➔
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Filter */}
        <JobFilter />

        {/* Intro */}
        <RecruitIntro />
      </div>
    </div>
  );
};

export default JobList;
