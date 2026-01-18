import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { getHealthAdvice } from '../services/geminiService';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '你好！我是博仁医院 AI 智能助手。请问有什么可以帮您？我可以为您提供就医指南、科室推荐或健康咨询。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getHealthAdvice(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-red to-brand-darkRed p-4 flex justify-between items-center text-white">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-1.5 rounded-full">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">AI 智能医生助理</h3>
            <p className="text-[10px] text-red-100 opacity-90 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Powered by Gemini
            </p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-brand-red text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
              <span className="text-xs text-gray-500">AI 正在思考...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="请输入您的症状或问题..."
            className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`ml-2 p-2 rounded-full ${input.trim() ? 'bg-brand-red text-white' : 'text-gray-400'} transition-all`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-[10px] text-center text-gray-400 mt-1">
          AI 建议仅供参考，不作为最终医疗诊断依据。
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;