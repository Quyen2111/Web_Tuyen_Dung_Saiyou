import { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'AI',
      text: 'Chào bạn! Tôi là trợ lý AI của Job Search. Bạn là ứng viên hay nhà tuyển dụng? Tôi có thể giúp bạn tìm việc, tạo CV, hoặc đăng tin tuyển dụng!',
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
    // Ensure customInput is a string before calling trim
    if (typeof customInput !== 'string' || customInput.trim() === '') return;

    const userMessage = { sender: 'User', text: customInput };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .concat(userMessage)
        .map((msg) => ({
          role: msg.sender === 'User' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

      const apiKey = import.meta.env.VITE_API_URL;
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
              maxOutputTokens: 150,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch AI response');
      }

      let aiResponse = data.candidates[0].content.parts[0].text;

      if (customInput.toLowerCase().includes('tìm việc làm')) {
        aiResponse += `\n\nBạn có thể tìm việc làm theo ngành nghề (Bán hàng, Kế toán, IT - Phần mềm,...) hoặc khu vực (TP.HCM, Hà Nội, Đà Nẵng,...) tại trang **Việc Làm** trên Job Search. Truy cập: https://jobsearch.vn/viec-lam`;
      } else if (customInput.toLowerCase().includes('liên hệ')) {
        aiResponse += `\n\nLiên hệ với Job Search qua email: support@jobsearch.vn hoặc số điện thoại: (+84) 123 456 789. Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM.`;
      } else if (customInput.toLowerCase().includes('tạo cv')) {
        aiResponse += `\n\nBạn có thể tạo và quản lý CV chuyên nghiệp tại trang **Hồ sơ & CV** trên Job Search. Truy cập: https://jobsearch.vn/ho-so-cv`;
      }

      setMessages((prev) => [...prev, { sender: 'AI', text: aiResponse }]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'AI',
          text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ support@jobsearch.vn!',
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
        >
          <FiMessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-92 h-120 rounded-lg shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat với Job Search</h3>
            <button onClick={toggleChat}>
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
                  className={`max-w-xs p-2 rounded-lg ${
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
            />
            <button
              onClick={() => handleSendMessage()} // Explicitly call with no arguments
              disabled={isLoading}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
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