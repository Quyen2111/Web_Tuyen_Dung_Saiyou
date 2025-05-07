import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'AI',
      text: 'Chào bạn! Tôi là trợ lý AI của Job Search, giúp bạn tìm việc, tạo CV, hoặc đăng tin tuyển dụng. Bạn cần hỗ trợ gì hôm nay?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    'Tìm việc làm tại TP.HCM',
    'Hướng dẫn tạo CV',
    'Cách đăng tin tuyển dụng',
    'Liên hệ hỗ trợ',
  ];

  const systemPrompt = `
    Bạn là trợ lý AI của Job Search, một nền tảng tìm việc làm tại Việt Nam. Nhiệm vụ của bạn là hỗ trợ người dùng (ứng viên hoặc nhà tuyển dụng) với các thông tin về:
    - Tìm kiếm việc làm theo ngành nghề (Bán hàng, Kế toán, IT,...) hoặc khu vực (TP.HCM, Hà Nội, Đà Nẵng,...).
    - Hướng dẫn tạo và quản lý CV tại https://jobsearch.vn/ho-so-cv.
    - Hỗ trợ đăng tin tuyển dụng tại https://jobsearch.vn/dang-tin-tuyen-dung.
    - Cung cấp thông tin liên hệ: email support@jobsearch.vn, số điện thoại (+84) 123 456 789, địa chỉ 123 Đường ABC, Quận 1, TP.HCM.
    Vui lòng trả lời ngắn gọn, chính xác, và bằng tiếng Việt. Nếu người dùng hỏi về tìm việc, tạo CV, hoặc liên hệ, hãy cung cấp link hoặc thông tin liên quan. Đối với các câu hỏi khác, trả lời dựa trên kiến thức chung hoặc đề xuất liên hệ hỗ trợ.
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    handleSendMessage(reply);
  };

  const handleSendMessage = async (customInput = input) => {
    if (typeof customInput !== 'string' || customInput.trim() === '') return;

    const userMessage = { sender: 'User', text: customInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = [
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...messages.concat(userMessage).map((msg) => ({
          role: msg.sender === 'User' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })),
      ];

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
      if (!apiKey) throw new Error('API key is missing');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: conversationHistory,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200, 
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Không thể kết nối với Gemini');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;

      setMessages((prev) => [...prev, { sender: 'AI', text: aiResponse }]);
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'AI',
          text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ support@jobsearch.vn!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Mở chat với Job Search"
        >
          <FiMessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[28rem] rounded-lg shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat với Job Search</h3>
            <button onClick={toggleChat} aria-label="Đóng chat">
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  message.sender === 'User' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.sender === 'User'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-2">
                <div className="bg-gray-200 text-gray-800 p-2 rounded-lg">
                  <p>Đang xử lý...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 bg-gray-100 border-t">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full hover:bg-blue-200 transition duration-200"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 border-t flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              disabled={isLoading}
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              aria-label="Nhập tin nhắn để trò chuyện"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              aria-label="Gửi tin nhắn"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;