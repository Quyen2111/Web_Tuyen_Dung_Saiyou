"use client"

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function CandidateDetailPage() {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/CV/${candidateId}`);

      if (!response.ok) {
        throw new Error(response.status === 404 ? "CV không tồn tại" : `Lỗi API: ${response.status}`);
      }

      const data = await response.json();
      setCandidate(data);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi khi tải chi tiết ứng viên:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [candidateId]);

  const skillColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-red-100 text-red-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
    "bg-cyan-100 text-cyan-700",
    "bg-lime-100 text-lime-700",
    "bg-emerald-100 text-emerald-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
    "bg-violet-100 text-violet-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-rose-100 text-rose-700",
  ];

  const getSkillColor = (skill) => {
    const randomIndex = Math.floor(Math.random() * skillColors.length);
    return skillColors[randomIndex];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
            role="status"
          >
            <span className="sr-only">Đang tải...</span>
          </div>
          <p className="mt-2 text-gray-600">Đang tải chi tiết ứng viên...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Lỗi: {error}</p>
          <p className="mt-2">Vui lòng thử lại hoặc quay lại danh sách.</p>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={fetchCandidate}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Thử tải lại
            </button>
            <button
              onClick={() => navigate('/employer/jobs')}
              className="inline-block bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <p>Không tìm thấy ứng viên.</p>
          <button
            onClick={() => navigate('/employer/jobs')}
            className="mt-4 inline-block bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <button
          onClick={() => navigate('/employer/jobs')}
          className="mb-6 inline-block bg-gradient-to-r from-gray-500 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300"
        >
          Quay lại
        </button>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={candidate.avatar || "https://via.placeholder.com/140"}
            alt={candidate.name}
            className="w-36 h-36 rounded-full border-4 border-blue-200 shadow-lg object-cover"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              {candidate.name || "Chưa có tên"}
            </h1>
            <p className="text-xl font-medium text-blue-600">{candidate.title || "Chưa có chức danh"}</p>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 mt-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>{candidate.address || "Chưa có địa điểm"}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                Giới Thiệu
              </h2>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {candidate.introduce || "Chưa có giới thiệu."}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                Kinh Nghiệm Làm Việc
              </h2>
              {candidate.experience && typeof candidate.experience === "object" && Object.keys(candidate.experience).length > 0 ? (
                Object.values(candidate.experience).map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 mb-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.company} • {exp.date}</p>
                    <ul className="mt-2 space-y-1 text-gray-700 list-disc list-inside">
                      {(exp.responsibility || '').split('; ').map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">Chưa có kinh nghiệm làm việc.</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                Học Vấn
              </h2>
              {candidate.education && typeof candidate.education === "object" && Object.keys(candidate.education).length > 0 ? (
                Object.values(candidate.education).map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 mb-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
                    <p className="text-sm text-gray-600">{edu.time}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">Chưa có thông tin học vấn.</p>
              )}
            </div>
          </div>

          <div className="col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                Thông Tin Liên Hệ
              </h2>
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>{candidate.email || "Chưa có email"}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>{candidate.sdt || "Chưa có số điện thoại"}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>{candidate.address || "Chưa có địa điểm"}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                Kỹ Năng
              </h2>
              {candidate.skill && Array.isArray(candidate.skill) && candidate.skill.length > 0 ? (
                <div className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded-lg">
                  {candidate.skill.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getSkillColor(skill)}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">Chưa có kỹ năng.</p>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
                Nguồn Tham Khảo
              </h2>
              {candidate.references && Array.isArray(candidate.references) && candidate.references.length > 0 ? (
                candidate.references.map((ref, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg mb-2">
                    <p className="text-gray-800 font-medium">{ref.name}</p>
                    <p className="text-gray-600 text-sm">{ref.organization}</p>
                    <p className="text-blue-600 font-semibold">{ref.score}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">Chưa có nguồn tham khảo.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}