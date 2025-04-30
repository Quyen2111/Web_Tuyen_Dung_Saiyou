import React from 'react';
import { Link } from 'react-router-dom';
const EmployerService = () => {
    return (
        <div className="flex flex-col min-h-screen">
            
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row">
            <div className="bg-blue-600 text-white p-8 md:p-16 flex flex-col justify-center md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Tìm kiếm ứng viên phù hợp cho doanh nghiệp của bạn
              </h1>
              <p className="mb-8 text-blue-100">
                Tiếp cận hàng nghìn ứng viên tiềm năng và đăng tuyển dụng dễ dàng
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                    to="/employer/register" 
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium"
                    >
                    Đăng ký ngay
                </Link>
                <Link 
                    to="/about"
                    className="border border-white text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium"
                    >
                    Tìm hiểu thêm
                </Link>
        
              </div>
            </div>
            <div className="md:w-1/2 bg-blue-100 relative min-h-[300px]">
              <img
                src="./img/logotuyendung.png"
                alt="Người tuyển dụng"
                className="object-contain w-full h-full"
              />
            </div>
          </section>
    
          {/* Stats Section */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">10K+</p>
                <p className="text-gray-600">Ứng viên tìm việc</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">5K+</p>
                <p className="text-gray-600">Doanh nghiệp tin tưởng</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">20K+</p>
                <p className="text-gray-600">Tuyển dụng thành công</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">95%</p>
                <p className="text-gray-600">Tỉ lệ hài lòng</p>
              </div>
            </div>
          </section>
    
          {/* Why Choose Us Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Tại sao chọn chúng tôi?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-600 w-6 h-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">Tìm kiếm thông minh</h3>
                  <p className="text-gray-600">
                    Công nghệ AI giúp bạn tìm ra ứng viên phù hợp nhất với nhu cầu
                    của công ty bạn
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-600 w-6 h-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">Tiết kiệm thời gian</h3>
                  <p className="text-gray-600">
                    Quy trình đăng tuyển đơn giản, nhanh chóng và hiệu quả
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-600 w-6 h-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">Bảo mật dữ liệu</h3>
                  <p className="text-gray-600">
                    Thông tin của bạn luôn được bảo mật và chỉ chia sẻ với các bên
                    liên quan
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Pricing Section */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Gói dịch vụ</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Gói Cơ bản */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-600 hover:border-2 hover:shadow-lg">
                    <div className="p-6">
                        <h3 className="text-xl font-bold">Cơ bản</h3>
                        <p className="text-2xl font-bold text-blue-600">
                        1.000.000đ{" "}
                        <span className="text-sm text-gray-500 font-normal">
                            /tháng
                        </span>
                        </p>
                    </div>
                    <div className="p-6 border-t border-gray-200">
                        <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> 5 tin tuyển
                            dụng
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> 50 ứng viên
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> Báo cáo cơ bản
                        </li>
                        </ul>
                    </div>
                    <div className="p-6 border-t border-gray-200">
                        <Link 
                            to="/employer/register" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block text-center"
                            >
                            Chọn gói
                        </Link>
                    </div>
                    </div>

                    {/* Gói Chuyên nghiệp */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:border-blue-600 hover:border-2 hover:shadow-lg relative">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm">
                        Phổ biến
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold">Chuyên nghiệp</h3>
                        <p className="text-2xl font-bold text-blue-600">
                        2.500.000đ{" "}
                        <span className="text-sm text-gray-500 font-normal">
                            /tháng
                        </span>
                        </p>
                    </div>
                    <div className="p-6 border-t border-gray-200">
                        <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> 20 tin tuyển
                            dụng
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> 200 ứng viên
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> Báo cáo chi
                            tiết
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> Hỗ trợ ưu tiên
                        </li>
                        </ul>
                    </div>
                    <div className="p-6 border-t border-gray-200">
                    <Link 
                        to="/employer/register" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block text-center"
                        >
                         Chọn gói
                    </Link>
                      
                    </div>
                    </div>

                    {/* Gói Doanh nghiệp */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-600 hover:border-2 hover:shadow-lg">
                    <div className="p-6">
                        <h3 className="text-xl font-bold">Doanh nghiệp</h3>
                        <p className="text-2xl font-bold text-blue-600">
                        5.000.000đ{" "}
                        <span className="text-sm text-gray-500 font-normal">
                            /tháng
                        </span>
                        </p>
                    </div>
                    <div className="p-6 border-t border-gray-200">
                        <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> Không giới hạn
                            tin
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> Không giới hạn
                            ứng viên
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> API tích hợp
                        </li>
                        <li className="flex items-center">
                            <span className="text-blue-600 mr-2">✓</span> Tư vấn riêng
                        </li>
                        </ul>
                    </div>
                    <div className="p-6 border-t border-gray-200">
                    <Link 
                        to="/employer/register" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block text-center"
                        >
                        Chọn gói
                    </Link>
                    </div>
                    </div>
                </div>
                </div>
          </section>
    
          {/* Testimonials Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Khách hàng nói gì về chúng tôi
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                      <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="Nguyễn Văn A"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Nguyễn Văn A</h4>
                      <p className="text-sm text-gray-600">Giám đốc nhân sự</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Dịch vụ tuyển dụng chuyên nghiệp, giúp chúng tôi tìm được ứng
                    viên phù hợp trong thời gian ngắn"
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                      <img
                        src="https://randomuser.me/api/portraits/women/1.jpg"
                        alt="Trần Thị B"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Trần Thị B</h4>
                      <p className="text-sm text-gray-600">Trưởng phòng tuyển dụng</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Thực sự hài lòng về dịch vụ, tiết kiệm thời gian và chi phí
                    tuyển dụng cho công ty chúng tôi"
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                      <img
                        src="https://randomuser.me/api/portraits/men/2.jpg"
                        alt="Lê Văn C"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Lê Văn C</h4>
                      <p className="text-sm text-gray-600">CEO</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Không thể hài lòng hơn, giúp doanh nghiệp tìm được nhân tài phù
                    hợp"
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          {/* CTA Section */}
          <section className="py-16 px-4 bg-blue-600 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Bắt đầu tuyển dụng ngay hôm nay
              </h2>
              <p className="mb-8">Đăng ký và nhận 30 ngày dùng thử miễn phí</p>
              <Link 
                to="/employer/register" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium inline-block text-center"
                >
                Đăng ký ngay
            </Link>
            </div>
          </section>
        </div>
      );
}

export default EmployerService;