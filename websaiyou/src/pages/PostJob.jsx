import React, { useState } from "react";

const PostJob = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    salary: "",
    location: "",
    field: "Công nghệ thông tin",
    postDate: "",
    probationTime: "",
    level: "Nhân viên",
    quantity: "",
    workType: "Toàn thời gian",
    educationReq: "Không yêu cầu",
    experienceReq: "Không yêu cầu",
    industry: "",
    jobDescription: [""],
    jobRequirements: [""],
    benefits: [""],
    workLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Xử lý các trường thông thường
    if (!e.target.hasAttribute('data-index')) {
      setFormData({
        ...formData,
        [name]: value,
      });
      return;
    }
    
    // Xử lý các trường dạng mảng
    const index = parseInt(e.target.getAttribute('data-index'));
    const field = e.target.getAttribute('data-field');
    
    const newArray = [...formData[field]];
    newArray[index] = value;
    
    setFormData({
      ...formData,
      [field]: newArray,
    });
  }
  const removeItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length ? newArray : [""] 
    });
  }
  const addItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Xử lý gửi dữ liệu form
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-center mb-6">Đăng tin tuyển dụng</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Thông tin cơ bản */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Thông tin cơ bản</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên công ty/Người tuyển dụng */}
            <div>
              <label className="block text-sm mb-1">
                Tên công ty/Người tuyển dụng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Tên công việc */}
            <div>
              <label className="block text-sm mb-1">
                Tên công việc <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Lương cơ bản */}
            <div>
              <label className="block text-sm mb-1">
                Lương cơ bản <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Địa điểm */}
            <div>
              <label className="block text-sm mb-1">
                Địa điểm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Lĩnh vực */}
            <div>
              <label className="block text-sm mb-1">Lĩnh vực</label>
              <div className="relative">
                <select
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                  <option value="Tài chính - Ngân hàng">Tài chính - Ngân hàng</option>
                  <option value="Kế toán - Kiểm toán">Kế toán - Kiểm toán</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Bán hàng">Bán hàng</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Ngày đăng */}
            <div>
              <label className="block text-sm mb-1">
                Ngày đăng <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="postDate"
                  value={formData.postDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="mm/dd/yyyy"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Thời gian thử việc */}
            <div>
              <label className="block text-sm mb-1">Thời gian thử việc</label>
              <input
                type="text"
                name="probationTime"
                value={formData.probationTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Cấp bậc */}
            <div>
              <label className="block text-sm mb-1">Cấp bậc</label>
              <div className="relative">
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Trưởng nhóm">Trưởng nhóm</option>
                  <option value="Quản lý">Quản lý</option>
                  <option value="Giám đốc">Giám đốc</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Số lượng tuyển */}
            <div>
              <label className="block text-sm mb-1">
                Số lượng tuyển <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Hình thức làm việc */}
            <div>
              <label className="block text-sm mb-1">Hình thức làm việc</label>
              <div className="relative">
                <select
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Toàn thời gian">Toàn thời gian</option>
                  <option value="Bán thời gian">Bán thời gian</option>
                  <option value="Thực tập">Thực tập</option>
                  <option value="Freelance">Freelance</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Yêu cầu bằng cấp */}
            <div>
              <label className="block text-sm mb-1">Yêu cầu bằng cấp</label>
              <div className="relative">
                <select
                  name="educationReq"
                  value={formData.educationReq}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Không yêu cầu">Không yêu cầu</option>
                  <option value="Trung cấp">Trung cấp</option>
                  <option value="Cao đẳng">Cao đẳng</option>
                  <option value="Đại học">Đại học</option>
                  <option value="Sau đại học">Sau đại học</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Yêu cầu kinh nghiệm */}
            <div>
              <label className="block text-sm mb-1">Yêu cầu kinh nghiệm</label>
              <div className="relative">
                <select
                  name="experienceReq"
                  value={formData.experienceReq}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Không yêu cầu">Không yêu cầu</option>
                  <option value="Dưới 1 năm">Dưới 1 năm</option>
                  <option value="1 năm">1 năm</option>
                  <option value="2 năm">2 năm</option>
                  <option value="3 năm">3 năm</option>
                  <option value="4 năm">4 năm</option>
                  <option value="5 năm trở lên">5 năm trở lên</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Thông tin chi tiết */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Thông tin chi tiết</h2>
          
          <div className="space-y-6">
            {/* Ngành nghề */}
            <div>
              <label className="block text-sm mb-1">Ngành nghề</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Mô tả công việc */}
            <div>
            <label className="block text-sm mb-1">
              Mô tả công việc <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {formData.jobDescription.map((item, index) => (
                <div key={`desc-${index}`} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-field="jobDescription"
                    data-index={index}
                    value={item}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={index === 0} // Chỉ bắt buộc mục đầu tiên
                  />
                  {formData.jobDescription.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem("jobDescription", index)}
                      className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem("jobDescription")}
                className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Thêm mô tả
              </button>
            </div>
          </div>
            
            {/* Yêu cầu công việc */}
            <div>
            <label className="block text-sm mb-1">
              Yêu cầu công việc <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {formData.jobRequirements.map((item, index) => (
                <div key={`req-${index}`} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-field="jobRequirements"
                    data-index={index}
                    value={item}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={index === 0} // Chỉ bắt buộc mục đầu tiên
                  />
                  {formData.jobRequirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem("jobRequirements", index)}
                      className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem("jobRequirements")}
                className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Thêm yêu cầu
              </button>
            </div>
          </div>
            
            {/* Quyền lợi */}
            <div>
            <label className="block text-sm mb-1">Quyền lợi</label>
            <div className="space-y-2">
              {formData.benefits.map((item, index) => (
                <div key={`benefit-${index}`} className="flex items-center gap-2">
                  <input
                    type="text"
                    data-field="benefits"
                    data-index={index}
                    value={item}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem("benefits", index)}
                      className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem("benefits")}
                className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Thêm quyền lợi
              </button>
            </div>
          </div>
            
            {/* Địa điểm làm việc */}
            <div>
              <label className="block text-sm mb-1">
                Địa điểm làm việc <span className="text-red-500">*</span>
              </label>
              <textarea
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;