import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobs } from '../api';
import JobDetail from '../components/JobDetail';
import RelatedJobs from '../components/RelatedJobs';
import Banner from '../components/Banner';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJob = async () => {
      try {
        // Lấy toàn bộ danh sách công việc từ API
        const data = await fetchJobs();
        // Tìm công việc theo jobId
        const selectedJob = data.find((job) => job.id === jobId);

        if (selectedJob) {
          // Chuẩn hóa dữ liệu để truyền vào JobDetail
          setJob({
            id: selectedJob.id,
            logo: selectedJob.logo,
            company: selectedJob.company,
            title: selectedJob.title,
            salary: selectedJob.salary,
            location: selectedJob.location,
            deadline: selectedJob.deadline || 'Không xác định',
            postDate: selectedJob.date,
            probationPeriod: selectedJob.time,
            level: selectedJob.rank,
            quantity: selectedJob.quantity,
            workType: selectedJob.form,
            requiredDegree: selectedJob.degree,
            requiredExperience: selectedJob.experience,
            industry: selectedJob.professional,
            description: selectedJob.description,
            requirements: selectedJob.requirements,
            benefits: selectedJob.benefits,
            workLocation: selectedJob.workplace,
          });

          // Lọc công việc liên quan
          const related = data
            .filter((item) => item.id !== jobId) // Loại trừ công việc hiện tại
            .filter(
              (item) =>
                item.professional === selectedJob.professional || // Cùng ngành nghề
                item.location === selectedJob.location // Hoặc cùng địa điểm
            )
            .slice(0, 3); // Giới hạn tối đa 3 công việc

          setRelatedJobs(related);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
      setLoading(false);
    };
    getJob();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <Banner />
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Đang tải thông tin công việc...</p>
        </div>
      ) : job ? (
        <div className="max-w-15xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* JobDetail bên trái */}
            <div className="lg:col-span-2">
              <JobDetail job={job} />
            </div>
            {/* RelatedJobs bên phải */}
            <div className="lg:col-span-1 mr-4">
              <RelatedJobs relatedJobs={relatedJobs} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg max-w-6xl mx-auto">
          <p className="text-gray-600 text-lg">Không tìm thấy công việc.</p>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;