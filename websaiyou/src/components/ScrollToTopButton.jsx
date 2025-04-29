import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPageLongEnough, setIsPageLongEnough] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Kiểm tra chiều dài trang và hiển thị/ẩn nút
  const checkScrollAndPageHeight = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Kiểm tra nếu chiều dài trang lớn hơn chiều cao màn hình
    const pageLongEnough = documentHeight > windowHeight;
    setIsPageLongEnough(pageLongEnough);

    // Hiển thị nút nếu trang dài và đã cuộn xuống (scrollTop > 0)
    if (pageLongEnough && scrollTop > 0) {
      setIsVisible(true);
      resetHideTimeout();
    } else {
      setIsVisible(false);
      clearTimeout(hideTimeout); // Đảm bảo clear timeout khi nút ẩn
    }
  };

  // Reset timeout để ẩn nút sau 2 giây không tương tác
  const resetHideTimeout = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    const newTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    setHideTimeout(newTimeout);
  };

  // Cuộn lên đầu trang với hiệu ứng "WOW"
  const scrollToTop = () => {
    setIsScrolling(true);

    // Tạo lớp phủ mờ tạm thời
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/20 z-40 animate-fadeOverlay';
    document.body.appendChild(overlay);

    // Áp dụng hiệu ứng scale cho nội dung trang
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-scaleUp');
    }

    // Cuộn lên đầu với hiệu ứng mượt mà trong 1 giây
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });

    // Xóa lớp phủ sau khi animation hoàn tất
    setTimeout(() => {
      document.body.removeChild(overlay);
      setIsScrolling(false);
    }, 1200);
  };

  // Thêm sự kiện cuộn và kiểm tra chiều dài trang
  useEffect(() => {
    const handleScroll = () => {
      checkScrollAndPageHeight();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollAndPageHeight);
    checkScrollAndPageHeight(); // Kiểm tra ngay khi component mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollAndPageHeight);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  // Chỉ hiển thị nút nếu trang dài và nút đang ở trạng thái visible
  if (!isPageLongEnough || !isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 z-50 ${
        isScrolling ? 'animate-bounce' : 'animate-fadeIn'
      }`}
      title="Lên đầu trang"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;