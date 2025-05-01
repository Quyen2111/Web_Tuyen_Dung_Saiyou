import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import SkillItem from '../components/SkillItem';
import ReferenceItem from '../components/ReferenceItem';
import WorkExperienceItem from '../components/WorkExperienceItem';
import EducationItem from '../components/EducationItem';

const ResumePage = () => {
  // State cho header (tên, chức danh, địa điểm)
  const [profile, setProfile] = useState({ name: '', title: '', location: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // State cho avatar
  const [avatar, setAvatar] = useState('/img/avatar.png'); // Ảnh mặc định

  // State cho giới thiệu
  const [introduction, setIntroduction] = useState('');
  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false);

  // State cho kinh nghiệm làm việc
  const [workExperiences, setWorkExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    responsibilities: [''],
  });

  // State cho học vấn
  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({ institution: '', duration: '' });

  // State cho kỹ năng
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  // State cho nguồn
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({ name: '', organization: '', score: '' });

  // State cho thông tin liên hệ
  const [contactInfo, setContactInfo] = useState({ phone: '', linkedin: '' });
  const [isEditingContact, setIsEditingContact] = useState(false);

  // Hàm xử lý khi chọn file ảnh
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Lưu URL của ảnh đã chọn
      };
      reader.readAsDataURL(file); // Chuyển file thành Data URL để hiển thị
    }
  };

  // Hàm xóa avatar (trở về ảnh mặc định)
  const handleDeleteAvatar = () => {
    setAvatar('https://via.placeholder.com/80'); // Quay lại ảnh mặc định
  };

  // Hàm giả lập tải CV
  const handleDownloadCV = () => {
    alert('Đang tải CV... (Chức năng giả lập)');
  };

  // Hàm xử lý chỉnh sửa profile
  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  // Hàm xử lý thêm kinh nghiệm làm việc
  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.duration && newExperience.responsibilities[0]) {
      setWorkExperiences([...workExperiences, newExperience]);
      setNewExperience({ title: '', company: '', duration: '', responsibilities: [''] });
    }
  };

  const handleUpdateExperience = (index, updatedExperience) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index] = updatedExperience;
    setWorkExperiences(updatedExperiences);
  };

  const handleDeleteExperience = (index) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  // Hàm xử lý thêm học vấn
  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.duration) {
      setEducations([...educations, newEducation]);
      setNewEducation({ institution: '', duration: '' });
    }
  };

  const handleUpdateEducation = (index, updatedEducation) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = updatedEducation;
    setEducations(updatedEducations);
  };

  const handleDeleteEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  // Hàm xử lý thêm kỹ năng
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Hàm xử lý thêm nguồn
  const handleAddReference = () => {
    if (newReference.name.trim() && newReference.organization.trim() && newReference.score.trim()) {
      setReferences([...references, { ...newReference }]);
      setNewReference({ name: '', organization: '', score: '' });
    }
  };

  const handleUpdateReference = (index, updatedReference) => {
    const updatedReferences = [...references];
    updatedReferences[index] = updatedReference;
    setReferences(updatedReferences);
  };

  const handleDeleteReference = (index) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  // Hàm xử lý chỉnh sửa thông tin liên hệ
  const handleSaveContact = () => {
    setIsEditingContact(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Hiệu ứng nền động */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-blue-400/20 animate-pulse pointer-events-none" />

      <div className="max-w-8xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <label className="cursor-pointer">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <div className="absolute bottom-0 right-0">
                {/* Nút xóa ảnh */}
                <button
                  onClick={handleDeleteAvatar}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              {isEditingProfile ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Tên..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="Chức danh..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="Địa điểm..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {profile.name || 'Tên của bạn'}
                  </h1>
                  <p className="text-lg font-medium text-gray-600">{profile.title || 'Chức danh'}</p>
                  <p className="text-sm text-gray-500">{profile.location || 'Địa điểm'}</p>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="absolute top-0 right-0 text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-7 7a2 2 0 01-.828.414l-3 1a1 1 0 01-1.224-1.224l1-3a2 2 0 01.414-.828l7-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleDownloadCV}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Tải CV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột bên trái: Giới thiệu, Kinh nghiệm, Học vấn */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            {/* Giới thiệu */}
            <div className="transform transition-all duration-500 animate-slideInLeft">
              <SectionTitle title="Giới thiệu" />
              {isEditingIntroduction ? (
                <div className="space-y-2">
                  <textarea
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    placeholder="Viết giới thiệu về bản thân..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  />
                  <button
                    onClick={() => setIsEditingIntroduction(false)}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <p className="text-gray-700 leading-relaxed">
                    {introduction || 'Chưa có giới thiệu. Nhấn chỉnh sửa để thêm.'}
                  </p>
                  <button
                    onClick={() => setIsEditingIntroduction(true)}
                    className="absolute top-0 right-0 text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-7 7a2 2 0 01-.828.414l-3 1a1 1 0 01-1.224-1.224l1-3a2 2 0 01.414-.828l7-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Kinh nghiệm làm việc */}
            <div className="transform transition-all duration-500 animate-slideInLeft">
              <SectionTitle title="Kinh nghiệm làm việc" />
              {workExperiences.length > 0 ? (
                workExperiences.map((experience, index) => (
                  <WorkExperienceItem
                    key={index}
                    experience={experience}
                    onUpdate={(updatedExperience) => handleUpdateExperience(index, updatedExperience)}
                    onDelete={() => handleDeleteExperience(index)}
                  />
                ))
              ) : (
                <p className="text-gray-600">Chưa có kinh nghiệm. Thêm kinh nghiệm bên dưới.</p>
              )}
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                  placeholder="Chức danh..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Công ty..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                  placeholder="Thời gian (VD: 07/2020 - Hiện tại)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-1">
                  {newExperience.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => {
                          const updatedResponsibilities = [...newExperience.responsibilities];
                          updatedResponsibilities[index] = e.target.value;
                          setNewExperience({ ...newExperience, responsibilities: updatedResponsibilities });
                        }}
                        placeholder="Trách nhiệm..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => {
                          setNewExperience({
                            ...newExperience,
                            responsibilities: newExperience.responsibilities.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-red-600 hover:text-red-800 transform hover:scale-110 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setNewExperience({ ...newExperience, responsibilities: [...newExperience.responsibilities, ''] })}
                    className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
                  >
                    + Thêm trách nhiệm
                  </button>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  Thêm kinh nghiệm
                </button>
              </div>
            </div>

            {/* Học vấn */}
            <div className="transform transition-all duration-500 animate-slideInLeft">
              <SectionTitle title="Học vấn" />
              {educations.length > 0 ? (
                educations.map((education, index) => (
                  <EducationItem
                    key={index}
                    education={education}
                    onUpdate={(updatedEducation) => handleUpdateEducation(index, updatedEducation)}
                    onDelete={() => handleDeleteEducation(index)}
                  />
                ))
              ) : (
                <p className="text-gray-600">Chưa có học vấn. Thêm học vấn bên dưới.</p>
              )}
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="Trường học..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newEducation.duration}
                  onChange={(e) => setNewEducation({ ...newEducation, duration: e.target.value })}
                  placeholder="Thời gian (VD: 2016 - 2020)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddEducation}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  Thêm học vấn
                </button>
              </div>
            </div>
          </div>

          {/* Cột bên phải: Thông tin liên hệ, Kỹ năng, Nguồn */}
          <div className="col-span-1 space-y-8">
            {/* Thông tin liên hệ */}
            <div className="transform transition-all duration-500 animate-slideInRight">
              <SectionTitle title="Thông tin liên hệ" />
              {isEditingContact ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <input
                      type="text"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="Số điện thoại..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.477-2.25-1.672-2.25-1.816 0-2.828 1.216-2.828 2.25v5.604h-3v-11h3v1.528c.424-.657 1.177-1.528 2.828-1.528 2.076 0 3.672 1.356 3.672 4.272v6.728z" />
                    </svg>
                    <input
                      type="text"
                      value={contactInfo.linkedin}
                      onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
                      placeholder="LinkedIn URL..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSaveContact}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Lưu
                  </button>
                </div>
              ) : (
                <div className="relative space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p className="text-gray-700">{contactInfo.phone || 'Chưa có số điện thoại'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.477-2.25-1.672-2.25-1.816 0-2.828 1.216-2.828 2.25v5.604h-3v-11h3v1.528c.424-.657 1.177-1.528 2.828-1.528 2.076 0 3.672 1.356 3.672 4.272v6.728z" />
                    </svg>
                    {contactInfo.linkedin ? (
                      <a
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {contactInfo.linkedin}
                      </a>
                    ) : (
                      <p className="text-gray-700">Chưa có LinkedIn</p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsEditingContact(true)}
                    className="absolute top-0 right-0 text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-7 7a2 2 0 01-.828.414l-3 1a1 1 0 01-1.224-1.224l1-3a2 2 0 01.414-.828l7-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Kỹ năng */}
            <div className="transform transition-all duration-500 animate-slideInRight">
              <SectionTitle title="Kỹ năng" />
              <div className="flex flex-wrap">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <SkillItem
                      key={index}
                      skill={skill}
                      onDelete={() => handleDeleteSkill(index)}
                    />
                  ))
                ) : (
                  <p className="text-gray-600">Chưa có kỹ năng. Thêm kỹ năng bên dưới.</p>
                )}
              </div>
              <div className="flex items-center mt-4 space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Thêm kỹ năng..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Nguồn */}
            <div className="transform transition-all duration-500 animate-slideInRight">
              <SectionTitle title="Nguồn" />
              <div className="space-y-3">
                {references.length > 0 ? (
                  references.map((ref, index) => (
                    <ReferenceItem
                      key={index}
                      reference={ref}
                      onUpdate={(updatedReference) => handleUpdateReference(index, updatedReference)}
                      onDelete={() => handleDeleteReference(index)}
                    />
                  ))
                ) : (
                  <p className="text-gray-600">Chưa có nguồn. Thêm nguồn bên dưới.</p>
                )}
                <div className="mt-4 space-y-2">
                  <input
                    type="text"
                    value={newReference.name}
                    onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
                    placeholder="Tên..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={newReference.organization}
                    onChange={(e) => setNewReference({ ...newReference, organization: e.target.value })}
                    placeholder="Tổ chức..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={newReference.score}
                    onChange={(e) => setNewReference({ ...newReference, score: e.target.value })}
                    placeholder="Điểm số..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddReference}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;