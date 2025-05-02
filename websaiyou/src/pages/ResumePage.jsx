"use client"

import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import SkillItem from '../components/SkillItem';
import ReferenceItem from '../components/ReferenceItem';
import WorkExperienceItem from '../components/WorkExperienceItem';
import EducationItem from '../components/EducationItem';

const ResumePage = () => {
  const [profile, setProfile] = useState({ name: '', title: '', location: '' });
  const [profileErrors, setProfileErrors] = useState({ name: '', title: '', location: '' });
  const [avatar, setAvatar] = useState('/img/avatar.png');
  const [introduction, setIntroduction] = useState('');
  const [introductionError, setIntroductionError] = useState('');
  const [workExperiences, setWorkExperiences] = useState([]);
  const [workExperienceError, setWorkExperienceError] = useState('');
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    responsibilities: [''],
  });
  const [educations, setEducations] = useState([]);
  const [educationError, setEducationError] = useState('');
  const [newEducation, setNewEducation] = useState({ institution: '', duration: '' });
  const [skills, setSkills] = useState([]);
  const [skillError, setSkillError] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({ name: '', organization: '', score: '' });
  const [contactInfo, setContactInfo] = useState({ phone: '', email: '' });
  const [contactErrors, setContactErrors] = useState({ phone: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar('/img/avatar.png');
  };

  const validateField = (field, value, fieldName) => {
    if (typeof value === 'string' && !value.trim()) {
      return `${fieldName} là bắt buộc.`;
    }
    if (field === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      return "Email không hợp lệ.";
    }
    return '';
  };

  const handleInputChange = (field, value, setState, setError, errorField, errorFieldName) => {
    if (field === 'introduction') {
      setIntroduction(value);
      setIntroductionError(validateField(errorField, value, errorFieldName));
    } else {
      setState(prev => ({ ...prev, [field]: value }));
      setError(prev => ({ ...prev, [errorField]: validateField(errorField, value, errorFieldName) }));
    }
  };

  const validateCV = () => {
    let isValid = true;
    const newProfileErrors = {
      name: validateField('name', profile.name, 'Tên'),
      title: validateField('title', profile.title, 'Chức danh'),
      location: validateField('location', profile.location, 'Địa điểm'),
    };
    const newContactErrors = {
      phone: validateField('phone', contactInfo.phone, 'Số điện thoại'),
      email: validateField('email', contactInfo.email, 'Email'),
    };

    if (Object.values(newProfileErrors).some(error => error)) isValid = false;
    setProfileErrors(newProfileErrors);

    const introError = validateField('introduction', introduction, 'Giới thiệu');
    if (introError) isValid = false;
    setIntroductionError(introError);

    const workError = workExperiences.length === 0 ? "Phải có ít nhất một kinh nghiệm làm việc." : '';
    if (workError) isValid = false;
    setWorkExperienceError(workError);

    const eduError = educations.length === 0 ? "Phải có ít nhất một thông tin học vấn." : '';
    if (eduError) isValid = false;
    setEducationError(eduError);

    const skillError = skills.length === 0 ? "Phải có ít nhất một kỹ năng." : '';
    if (skillError) isValid = false;
    setSkillError(skillError);

    if (Object.values(newContactErrors).some(error => error)) isValid = false;
    setContactErrors(newContactErrors);

    return isValid;
  };

  const handleSubmitCV = async () => {
    if (!validateCV()) {
      return;
    }

    try {
      const cvData = {
        name: profile.name,
        title: profile.title,
        address: profile.location,
        introduce: introduction,
        sdt: contactInfo.phone,
        email: contactInfo.email,
        avatar: avatar,
        experience: workExperiences.reduce((acc, exp, index) => ({
          ...acc,
          [`exp${index + 1}`]: {
            position: exp.title,
            company: exp.company,
            date: exp.duration,
            responsibility: exp.responsibilities.join('; '),
          },
        }), {}),
        education: educations.reduce((acc, edu, index) => ({
          ...acc,
          [`edu${index + 1}`]: {
            school: edu.institution,
            time: edu.duration,
          },
        }), {}),
        skill: skills,
        references: references.map(ref => ({
          name: ref.name,
          organization: ref.organization,
          score: ref.score,
        })),
      };

      const response = await fetch('https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/CV', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        throw new Error('Gửi CV thất bại');
      }

      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Lỗi khi gửi CV:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.duration && newExperience.responsibilities[0]) {
      setWorkExperiences([...workExperiences, newExperience]);
      setNewExperience({ title: '', company: '', duration: '', responsibilities: [''] });
      setWorkExperienceError('');
    }
  };

  const handleExperienceKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddExperience();
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

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.duration) {
      setEducations([...educations, newEducation]);
      setNewEducation({ institution: '', duration: '' });
      setEducationError('');
    }
  };

  const handleEducationKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEducation();
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

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setSkillError('');
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddReference = () => {
    if (newReference.name.trim() && newReference.organization.trim() && newReference.score.trim()) {
      setReferences([...references, { ...newReference }]);
      setNewReference({ name: '', organization: '', score: '' });
    }
  };

  const handleReferenceKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddReference();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <label className="cursor-pointer">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg object-cover transition-transform hover:scale-105"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleDeleteAvatar}
                className="absolute bottom-0 right-0 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-transform hover:scale-110"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value, setProfile, setProfileErrors, 'name', 'Tên')}
                    placeholder="Nhập tên của bạn"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {profileErrors.name && (
                  <p className="text-red-600 text-sm mt-1">{profileErrors.name}</p>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => handleInputChange('title', e.target.value, setProfile, setProfileErrors, 'title', 'Chức danh')}
                    placeholder="Nhập chức danh (VD: Chuyên viên Marketing)"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {profileErrors.title && (
                  <p className="text-red-600 text-sm mt-1">{profileErrors.title}</p>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value, setProfile, setProfileErrors, 'location', 'Địa điểm')}
                    placeholder="Nhập địa điểm (VD: TP.HCM)"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {profileErrors.location && (
                  <p className="text-red-600 text-sm mt-1">{profileErrors.location}</p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmitCV}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Nộp CV
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg shadow-sm">
            CV đã được nộp thành công!
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg shadow-sm">
            Lỗi khi gửi CV. Vui lòng kiểm tra lại các trường bắt buộc.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div>
              <SectionTitle title="Giới thiệu" />
              <textarea
                value={introduction}
                onChange={(e) => handleInputChange('introduction', e.target.value, setIntroduction, setIntroductionError, 'introduction', 'Giới thiệu')}
                placeholder="Viết giới thiệu về bản thân (VD: Tôi là một chuyên viên marketing với 3 năm kinh nghiệm...)"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-y"
              />
              {introductionError && (
                <p className="text-red-600 text-sm mt-1">{introductionError}</p>
              )}
            </div>

            <div>
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
              {workExperienceError && (
                <p className="text-red-600 text-sm mt-1">{workExperienceError}</p>
              )}
              <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                  placeholder="Chức danh (VD: Marketing Executive)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Công ty (VD: TMA Solutions)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                  placeholder="Thời gian (VD: 06/2021 - 04/2024)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-2">
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
                        onKeyDown={index === newExperience.responsibilities.length - 1 ? handleExperienceKeyDown : undefined}
                        placeholder="Trách nhiệm (VD: Triển khai chiến dịch Facebook Ads)"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => {
                          setNewExperience({
                            ...newExperience,
                            responsibilities: newExperience.responsibilities.filter((_, i) => i !== index),
                          });
                        }}
                        className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
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
                    className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                  >
                    + Thêm trách nhiệm
                  </button>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Thêm kinh nghiệm
                </button>
              </div>
            </div>

            <div>
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
              {educationError && (
                <p className="text-red-600 text-sm mt-1">{educationError}</p>
              )}
              <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="Trường học (VD: ĐH Kinh tế TP.HCM)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newEducation.duration}
                  onChange={(e) => setNewEducation({ ...newEducation, duration: e.target.value })}
                  onKeyDown={handleEducationKeyDown}
                  placeholder="Thời gian (VD: 2016 - 2020)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddEducation}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Thêm học vấn
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1 space-y-8">
            <div>
              <SectionTitle title="Thông tin liên hệ" />
              <div className="space-y-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <input
                      type="text"
                      value={contactInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value, setContactInfo, setContactErrors, 'phone', 'Số điện thoại')}
                      placeholder="Số điện thoại (VD: 0912345678)"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {contactErrors.phone && (
                    <p className="text-red-600 text-sm mt-1">{contactErrors.phone}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 4v16h21V4h-21zm1.5 1.5h18V8l-9 5.5L3 8V5.5zm0 3.17l8.25 5.02L19.5 8.67V18.5h-18V8.67z" />
                    </svg>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value, setContactInfo, setContactErrors, 'email', 'Email')}
                      placeholder="Email (VD: example@gmail.com)"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {contactErrors.email && (
                    <p className="text-red-600 text-sm mt-1">{contactErrors.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <SectionTitle title="Kỹ năng" />
              <div className="flex flex-wrap gap-2">
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
              {skillError && (
                <p className="text-red-600 text-sm mt-1">{skillError}</p>
              )}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Thêm kỹ năng (VD: Java, SEO)"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-transform hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <SectionTitle title="Nguồn tham khảo" />
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
                  <p className="text-gray-600">Chưa có nguồn. Thêm nguồn bên dưới (không bắt buộc).</p>
                )}
              </div>
              <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  value={newReference.name}
                  onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
                  placeholder="Tên người tham khảo"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newReference.organization}
                  onChange={(e) => setNewReference({ ...newReference, organization: e.target.value })}
                  placeholder="Tổ chức"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newReference.score}
                  onChange={(e) => setNewReference({ ...newReference, score: e.target.value })}
                  onKeyDown={handleReferenceKeyDown}
                  placeholder="Điểm số (VD: 8/10)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddReference}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Thêm nguồn tham khảo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;