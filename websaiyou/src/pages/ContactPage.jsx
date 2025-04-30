import React, { useState } from 'react';

const ContactPage = () => {
  // State để lưu thông tin form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    feedback: '',
  });

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý gửi form (giả lập)
  const handleSubmit = () => {
    if (formData.name && formData.phone && formData.email && formData.feedback) {
      alert('Cảm ơn bạn đã gửi thông tin liên hệ! Chúng tôi sẽ phản hồi sớm.');
      setFormData({ name: '', phone: '', email: '', feedback: '' });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Bản đồ full màn hình */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858169091041!2d106.6842704741734!3d10.822164158350184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1746016923983!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Trường Đại học Công nghiệp TP.HCM"
        />
      </div>

      {/* Form liên hệ ở góc trái */}
      <div className="absolute top-4 left-4 w-full max-w-sm bg-gray-100/90 backdrop-blur-sm rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Liên hệ</h2>
        <div className="space-y-3">
          {/* Tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên của bạn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Đánh giá */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Đánh giá</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Viết đánh giá hoặc ý kiến của bạn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            />
          </div>
          {/* Nút Gửi */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;