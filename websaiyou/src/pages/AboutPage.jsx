import React, { useEffect } from 'react';
import Banner from '../components/Banner';

const AboutPage = () => {
  // Smooth scroll khi nhấp vào liên kết trong mục lục
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const links = document.querySelectorAll('#muclucGioiThieu a');
    links.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient nền */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200 pointer-events-none" />

      <Banner/>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Tiêu đề chính */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center mb-12 leading-tight animate-fadeIn">
          Tuyển Dụng Là Gì? Mục Đích Và Vai Trò Của Tuyển Dụng Nhân Sự
        </h2>

        {/* Mục lục */}
        <div
          id="muclucGioiThieu"
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-slideUp"
        >
          <h4 className="text-2xl font-semibold text-gray-900 mb-6">Mục lục</h4>
          <ol className="space-y-4 text-gray-700">
            <li>
              <a
                href="#section1"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Tuyển dụng là gì?
              </a>
            </li>
            <li>
              <a
                href="#section2"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Mục đích và vai trò của việc tuyển dụng nhân sự
              </a>
              <ol className="ml-6 mt-2 space-y-2">
                <li>
                  <a
                    href="#section2-1"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
                  >
                    2.1. Doanh nghiệp
                  </a>
                </li>
                <li>
                  <a
                    href="#section2-2"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
                  >
                    2.2. Lực lượng lao động
                  </a>
                </li>
                <li>
                  <a
                    href="#section2-3"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
                  >
                    2.3. Xã hội
                  </a>
                </li>
              </ol>
            </li>
            <li>
              <a
                href="#section3"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Quy trình tuyển dụng nhân sự hiệu quả
              </a>
            </li>
            <li>
              <a
                href="#section4"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Làm sao để tuyển dụng nhân sự hiệu quả?
              </a>
            </li>
          </ol>
        </div>

        {/* Section 1: Tuyển dụng là gì? */}
        <section className="mb-16 animate-slideUp">
          <h3 id="section1" className="text-3xl font-bold text-gray-900 mb-6">
            Tuyển dụng là gì?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tuyển dụng là quá trình thu hút, sàng lọc, phỏng vấn và tuyển chọn ứng viên cho các vị trí còn trống, nhằm đáp ứng nhu cầu về nguồn nhân lực cho doanh nghiệp. Quá trình tuyển dụng bao gồm nhiều bước, bắt đầu từ việc xác định nhu cầu nhân viên, đăng tin tuyển dụng, thu thập và xem xét hồ sơ ứng viên, tiến hành phỏng vấn, đánh giá và kiểm tra kỹ năng, sau đó chọn ra ứng viên phù hợp nhất để đề xuất làm việc trong tổ chức.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Tuyển dụng là bước đầu tiên trong việc xây dựng nguồn nhân lực của một tổ chức. Ở cấp độ cao, mục tiêu là tìm kiếm và tuyển dụng những ứng viên tốt nhất, đúng thời gian và phù hợp với ngân sách.
          </p>
        </section>

        {/* Section 2: Mục đích và vai trò của việc tuyển dụng nhân sự */}
        <section className="mb-16 animate-slideUp">
          <h3 id="section2" className="text-3xl font-bold text-gray-900 mb-6">
            Mục đích và vai trò của việc tuyển dụng nhân sự
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nhân viên là huyết mạch của doanh nghiệp, vì vậy việc tìm kiếm và thu hút những ứng viên tốt nhất có thể là điều vô cùng quan trọng. Nỗ lực tuyển dụng kém có thể dẫn đến việc bị trống những vị trí quan trọng và giảm doanh thu, trong khi tuyển dụng thành công sẽ mang lại những ứng viên phù hợp một cách kịp thời, đảm bảo doanh nghiệp có thể tiếp tục phát triển.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Mục đích chính của tuyển dụng nhân sự là thu hút, chọn lọc và tuyển chọn những ứng viên có kỹ năng và năng lực phù hợp, đáp ứng các vị trí công việc còn trống trong tổ chức. Qua quá trình tuyển dụng, các công ty, tổ chức có thể đáp ứng nhu cầu nhân lực và xây dựng đội ngũ nhân viên có khả năng đóng góp vào sự thành công, phát triển của tổ chức.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Vai trò của việc tuyển dụng nhân sự đáp ứng ở 3 khía cạnh sau:
          </p>

          {/* Subsection 2.1: Doanh nghiệp */}
          <h4 id="section2-1" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Doanh nghiệp
          </h4>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <b>Đáp ứng nhu cầu về nguồn nhân lực:</b> Tuyển dụng nhân sự giúp tìm kiếm được những nhân viên có trình độ, năng lực, kinh nghiệm phù hợp với nhu cầu của doanh nghiệp. Đảm bảo hoạt động sản xuất, kinh doanh được diễn ra liên tục và hiệu quả.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <b>Nâng cao năng lực cạnh tranh:</b> Đội ngũ nhân lực chất lượng cao là yếu tố quan trọng quyết định đến năng lực cạnh tranh của doanh nghiệp. Công tác tuyển dụng nhân sự hiệu quả giúp doanh nghiệp có được đội ngũ nhân viên có chuyên môn, kỹ năng, kinh nghiệm và thái độ làm việc tốt, từ đó nâng cao năng lực cạnh tranh.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <b>Tiết kiệm chi phí:</b> Tuyển dụng được những nhân tài phù hợp giúp doanh nghiệp tiết kiệm chi phí đào tạo, tuyển dụng, thử việc,... Đồng thời giảm thiểu rủi ro và tăng hiệu quả sử dụng nguồn lực.
              </span>
            </li>
          </ul>

          {/* Subsection 2.2: Lực lượng lao động */}
          <h4 id="section2-2" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Lực lượng lao động
          </h4>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <b>Cơ hội việc làm:</b> Thông qua quá trình tuyển dụng, người lao động có thể tìm được công việc phù hợp với trình độ, năng lực và sở thích của mình.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <b>Tăng thu nhập:</b> Có việc làm sẽ có thu nhập ổn định, nâng cao chất lượng cuộc sống.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                <b>Phát triển bản thân:</b> Được làm việc, được cọ xát với thực tế, được tích lũy kinh nghiệm giúp người lao động có cơ hội học hỏi, phát triển kiến thức, kỹ năng, năng lực bản thân.
              </span>
            </li>
          </ul>

          {/* Subsection 2.3: Xã hội */}
          <h4 id="section2-3" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Xã hội
          </h4>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Khi lực lượng lao động có việc làm, điều này đồng nghĩa với việc giảm thiểu thất nghiệp, góp phần ổn định xã hội.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Tạo ra nhiều việc làm và đóng góp cho sự phát triển kinh tế - xã hội của đất nước.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Quá trình tuyển dụng nhân sự giúp nâng cao dân trí, góp phần xây dựng xã hội văn minh, hiện đại.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 3: Quy trình tuyển dụng nhân sự hiệu quả */}
        <section className="mb-16 animate-slideUp">
          <h3 id="section3" className="text-3xl font-bold text-gray-900 mb-6">
            Quy trình tuyển dụng nhân sự hiệu quả
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            Quy trình tuyển dụng nhân sự có thể thay đổi tùy theo vai trò của doanh nghiệp hoặc cá nhân mà họ đang tuyển dụng. Tuy nhiên, quy trình tuyển dụng hoàn chỉnh thường bao gồm 9 bước cơ bản sau:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>
              <a
                href="#b1"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 1. Xác định nhu cầu tuyển dụng
              </a>
            </li>
            <li>
              <a
                href="#b2"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 2. Xây dựng kế hoạch tuyển dụng
              </a>
            </li>
            <li>
              <a
                href="#b3"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 3. Phác thảo bản mô tả công việc
              </a>
            </li>
            <li>
              <a
                href="#b4"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 4. Tìm kiếm ứng viên
              </a>
            </li>
            <li>
              <a
                href="#b5"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 5. Sàng lọc hồ sơ
              </a>
            </li>
            <li>
              <a
                href="#b6"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 6. Phỏng vấn
              </a>
            </li>
            <li>
              <a
                href="#b7"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 7. Đánh giá ứng viên
              </a>
            </li>
            <li>
              <a
                href="#b8"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 8. Gửi thư mời ứng viên nhận việc
              </a>
            </li>
            <li>
              <a
                href="#b9"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Bước 9. Onboarding
              </a>
            </li>
          </ul>

          {/* Các bước chi tiết */}
          <h4 id="b1" className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
            Bước 1. Xác định nhu cầu tuyển dụng
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Trong bước này, nhà tuyển dụng xác định nhu cầu cụ thể về nhân sự, bao gồm số lượng và các yêu cầu về kỹ năng, kinh nghiệm và nền tảng giáo dục. Điều này giúp định hình quy trình tuyển dụng và xác định các vị trí cần nhắm tới.
          </p>

          <h4 id="b2" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 2. Xây dựng kế hoạch tuyển dụng
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Xác định các hoạt động cụ thể và lịch trình cho quy trình tuyển dụng. Bao gồm số lượng vị trí cần tuyển, các kỹ năng, kinh nghiệm cần thiết cho từng vị trí và thời gian tuyển dụng.
          </p>

          <h4 id="b3" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 3. Phác thảo bản mô tả công việc
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Trước khi tìm kiếm ứng viên, nhà tuyển dụng cần phác thảo bản mô tả công việc chi tiết cho vị trí tuyển dụng. Bản mô tả công việc này mô tả nhiệm vụ, trách nhiệm, kỹ năng và yêu cầu cần thiết cho công việc đó. Môi trường làm việc, văn hóa doanh nghiệp, phúc lợi, chế độ đãi ngộ, lương thưởng,...
          </p>

          <h4 id="b4" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 4. Tìm kiếm ứng viên
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Ở bước này, nhà tuyển dụng sử dụng các phương pháp khác nhau để tìm kiếm ứng viên phù hợp. Chẳng hạn như đăng tin tuyển dụng trên các trang web, sử dụng mạng xã hội, tuyển dụng từ nhiều nguồn hoặc thuê dịch vụ tuyển dụng bên thứ 3 để giúp tìm kiếm nhân tài.
          </p>

          <h4 id="b5" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 5. Sàng lọc hồ sơ
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Sau khi nhận được các đơn ứng tuyển, nhà tuyển dụng sẽ xem xét hồ sơ và sàng lọc ứng viên dựa trên tiêu chí đã đề ra. Điều này giúp giới hạn số lượng ứng viên và chọn ra các ứng viên tiềm năng cho vòng phỏng vấn tiếp theo.
          </p>

          <h4 id="b6" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 6. Phỏng vấn
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Tiến hành phỏng vấn các ứng viên được chọn. Phỏng vấn có thể được tiến hành cá nhân, qua điện thoại, trực tuyến hoặc thông qua các phương pháp khác nhau để đánh giá khả năng, kỹ năng và phù hợp với vị trí tuyển dụng.
          </p>

          <h4 id="b7" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 7. Đánh giá ứng viên
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Xem xét, đánh giá các ứng viên dựa trên kết quả phỏng vấn và các tiêu chí khác như kỹ năng, kinh nghiệm, tương thích với công việc và văn hóa tổ chức.
          </p>

          <h4 id="b8" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 8. Gửi thư mời ứng viên nhận việc
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Sau khi đánh giá và lựa chọn ứng viên phù hợp, nhà tuyển dụng tiến hành gửi thư mời ứng viên nhận việc. Thư mời này thông báo về quyền lợi và điều kiện của công việc, bao gồm mức lương, lợi ích, thời gian, địa điểm làm việc cùng các thông tin cần thiết khác. Ứng viên được yêu cầu xác nhận và thời gian bắt đầu công việc.
          </p>

          <h4 id="b9" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Bước 9. Onboarding
          </h4>
          <p className="text-gray-700 leading-relaxed mb-6">
            Cuối cùng trong quy trình tuyển dụng là onboarding, tiến hành tiếp nhận và hướng dẫn ứng viên mới vào công ty. Trong giai đoạn này, nhà tuyển dụng cung cấp cho ứng viên thông tin, tài liệu và huấn luyện cần thiết để họ có thể thích ứng nhanh chóng với môi trường làm việc mới. Đồng thời giới thiệu với đội ngũ nhân viên cũ, thúc đẩy mọi người tương tác và hỗ trợ lẫn nhau trong công việc.
          </p>

          {/* Hình ảnh minh họa */}
          <div className="relative mt-8 animate-slideInRight">
          <img
            src="./img/phongvan.jpg"
            alt="Phỏng vấn"
            className="w-2/3 max-w-5xl mx-auto h-auto rounded-2xl shadow-xl object-cover transform hover:scale-105 transition-transform duration-500"
          />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-2xl pointer-events-none" />
          </div>
        </section>

        {/* Section 4: Làm sao để tuyển dụng nhân sự hiệu quả? */}
        <section className="mb-16 animate-slideUp">
          <h3 id="section4" className="text-3xl font-bold text-gray-900 mb-6">
            Làm sao để tuyển dụng nhân sự hiệu quả?
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li>
              <a
                href="#c1"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Thiết lập quy trình tuyển dụng nhất quán
              </a>
            </li>
            <li>
              <a
                href="#c2"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Đào tạo đội ngũ tuyển dụng
              </a>
            </li>
            <li>
              <a
                href="#c3"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Xây dựng mối quan hệ với các nguồn lực bên ngoài
              </a>
            </li>
            <li>
              <a
                href="#c4"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Có trang web tuyển dụng của riêng doanh nghiệp
              </a>
            </li>
            <li>
              <a
                href="#c5"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Ứng dụng công nghệ
              </a>
            </li>
            <li>
              <a
                href="#c6"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Quản lý mối quan hệ ứng viên
              </a>
            </li>
            <li>
              <a
                href="#c7"
                className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
              >
                Tận dụng sự giới thiệu trong nội bộ
              </a>
            </li>
          </ol>

          {/* Các mục chi tiết */}
          <h4 id="c1" className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
            Thiết lập quy trình tuyển dụng nhất quán
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Quy trình tuyển dụng nhất quán sẽ giúp doanh nghiệp xác định rõ các bước cần thực hiện, tránh tình trạng thiếu sót hoặc trùng lặp. Đồng thời tiết kiệm thời gian và chi phí cho quá trình tuyển dụng. Có một quy trình tuyển dụng nhất quán cũng giúp doanh nghiệp tạo dựng hình ảnh chuyên nghiệp trong mắt ứng viên. Góp phần vào việc thu hút và giữ chân được những ứng viên tiềm năng.
          </p>

          <h4 id="c2" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Đào tạo đội ngũ tuyển dụng
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Hãy chắc chắn rằng đội ngũ tuyển dụng của doanh nghiệp luôn được đào tạo bài bản. Họ không chỉ hiểu từng bước trong quy trình tuyển dụng mà còn cảm thấy được chuẩn bị tốt để quản lý từng bước trong quy trình tuyển dụng một cách độc lập. Đầu tư vào đào tạo thường xuyên để giúp họ cập nhật các xu hướng và tiến bộ của ngành.
          </p>

          <h4 id="c3" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Xây dựng mối quan hệ với các nguồn lực bên ngoài
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Nếu sử dụng các nguồn tuyển dụng bên ngoài như nhà tư vấn, headhunter, talent acquisition,... hãy dành thời gian xây dựng mối quan hệ tích cực với họ. Họ càng biết nhiều về tổ chức thì họ càng chuẩn bị tốt hơn để cung cấp cho doanh nghiệp những ứng viên tiềm năng.
          </p>

          <h4 id="c4" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Có trang web tuyển dụng của riêng doanh nghiệp
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tạo một trang web nghề nghiệp hoặc thêm trang nghề nghiệp vào trang web hiện tại của doanh nghiệp. Trang web nghề nghiệp cung cấp một phương tiện trực tuyến để quảng bá thông tin về việc làm trong doanh nghiệp. Giúp tăng khả năng tiếp cận đến ứng viên tiềm năng và thu hút sự quan tâm của những người đang tìm kiếm công việc.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Trang web tuyển dụng không chỉ cung cấp thông tin về các vị trí tuyển dụng mà còn giới thiệu về doanh nghiệp, giúp ứng viên hiểu rõ hơn về sứ mệnh, giá trị và văn hóa của công ty. Góp phần thu hút những ứng viên chia sẻ các giá trị tương đồng và tạo sự tương tác tích cực.
          </p>

          <h4 id="c5" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Ứng dụng công nghệ
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Có rất nhiều tài nguyên có thể giúp hợp lý hóa và tự động hóa phần lớn quy trình tuyển dụng. Doanh nghiệp có thể xem xét các nền tảng tuyển dụng và quản lý mối quan hệ khác nhau để xem loại công nghệ nào có thể giúp đội ngũ quản lý nguồn nhân lực thực hiện quy trình tuyển dụng một cách tốt nhất.
          </p>

          <h4 id="c6" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Quản lý mối quan hệ ứng viên
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Hãy đảm bảo rằng doanh nghiệp luôn có sẵn một kế hoạch truyền thông hiệu quả cho nhà tuyển dụng và ứng viên. Xây dựng mối quan hệ tích cực với các ứng viên tiềm năng, đảm bảo họ sẽ cảm thấy được hỗ trợ nếu trúng tuyển hoặc cảm thấy hài lòng khi nộp đơn sau này nếu không nhận được vị trí đó.
          </p>

          <h4 id="c7" className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Tận dụng sự giới thiệu trong nội bộ
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Những ứng viên được giới thiệu bởi nhân viên hiện tại thường được đánh giá cao hơn. Vì nhân viên hiện tại đã có kiến thức về môi trường làm việc và yêu cầu công việc, họ có thể đưa ra những đề xuất chính xác về những người có thể phù hợp với vị trí cần tuyển.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Bên cạnh đó, quá trình tuyển dụng thông qua giới thiệu nội bộ thường nhanh chóng hơn so với các phương thức tuyển dụng khác. Doanh nghiệp có thể tiết kiệm thời gian và nguồn lực trong việc quảng cáo công việc, sàng lọc ứng viên và tiến hành phỏng vấn.
          </p>

          {/* Hình ảnh minh họa */}
          <div className="relative mt-8 animate-slideInRight">
          <img
            src="./img/tuyendung2.jpg"
            alt="Cách tuyển dụng"
            className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl object-cover max-h-[450px] transform hover:scale-105 transition-transform duration-500"
          />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-2xl pointer-events-none" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;