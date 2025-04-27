import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: './img/vdTuyendung/h1.jpg',
    title: 'Khám Phá Công Việc Mơ Ước',
    description: 'Tìm kiếm cơ hội nghề nghiệp phù hợp với bạn ngay hôm nay!',
    cta: 'Xem Ngay',
    ctaLink: '/jobs',
  },
  {
    image: './img/vdTuyendung/h2.jpg',
    title: 'Nâng Tầm Sự Nghiệp Của Bạn',
    description: 'Kết nối với những nhà tuyển dụng hàng đầu.',
    cta: 'Khám Phá',
    ctaLink: '/employer',
  },
  {
    image: './img/vdTuyendung/h3.jpg',
    title: 'Hồ Sơ Nổi Bật, Cơ Hội Rộng Mở',
    description: 'Tạo CV chuyên nghiệp, thu hút nhà tuyển dụng.',
    cta: 'Tạo CV',
    ctaLink: '/resume',
  },
  {
    image: './img/vdTuyendung/h4.jpg',
    title: 'Việc Làm Toàn Quốc',
    description: 'Tìm kiếm việc làm ở mọi khu vực, ngành nghề.',
    cta: 'Tìm Kiếm',
    ctaLink: '/jobs',
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide sau mỗi 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Chuyển đến slide trước
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  // Chuyển đến slide tiếp theo
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Chuyển đến slide cụ thể khi nhấn vào chấm
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12">
      {/* Slider Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl animate-fadeIn">
        {/* Slide */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex items-center justify-between transition-transform duration-1000 ease-in-out ${
                currentSlide === index ? 'translate-x-0' : 'translate-x-full'
              } ${currentSlide > index ? '-translate-x-full' : ''}`}
            >
              {/* Hình ảnh nền với hiệu ứng blur */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover opacity-80 animate-zoomIn"
                  style={{ filter: 'blur(3px)' }} // Làm mờ hình ảnh nền
                />
                {/* Lớp phủ gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              </div>

              {/* Nội dung slide */}
              <div className="relative z-10 w-full flex items-center justify-between px-6 sm:px-12 lg:px-16">
                {/* Text bên trái */}
                <div className="text-white max-w-lg">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight animate-slideUp">
                    {slide.title}
                  </h2>
                  <p className="text-lg sm:text-xl font-medium mb-6 opacity-90 animate-slideUp">
                    {slide.description}
                  </p>
                  <a
                    href={slide.ctaLink}
                    className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slideInRight"
                  >
                    {slide.cta}
                  </a>
                </div>

                {/* Hình ảnh minh họa bên phải (không bị blur) */}
                <div className="hidden lg:block max-w-sm">
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto rounded-xl shadow-xl object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng trái/phải */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full p-4 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInRight"
        >
          <svg
            className="w-7 h-7 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full p-4 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInRight"
        >
          <svg
            className="w-7 h-7 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Chấm tròn (Dots) */}
      <div className="flex justify-center mt-8 space-x-4 animate-slideUp">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-5 h-5 rounded-full transition-all duration-300 transform hover:scale-125 focus:outline-none ${
              currentSlide === index
                ? 'bg-blue-600 scale-125 shadow-md'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;