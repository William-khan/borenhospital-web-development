import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../types';

interface LoginProps {
  setAuthState: (state: AuthState) => void;
}

const Login: React.FC<LoginProps> = ({ setAuthState }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setAuthState(AuthState.LOGGED_IN);
      navigate('/dashboard');
    } else if (username && password) {
       // Mock success for any input
      setAuthState(AuthState.LOGGED_IN);
      navigate('/dashboard');
    } else {
      setError('请输入用户名和密码');
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden flex min-h-[500px]">
        {/* Left Side: Illustration/Brand (Optional, keeps it balanced) - Mobile Hidden */}
        <div className="hidden md:block w-1/2 bg-brand-red relative">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-black/30"></div>
           <div className="relative z-10 p-12 text-white flex flex-col justify-center h-full">
             <h2 className="text-3xl font-bold mb-4">欢迎回来</h2>
             <p className="opacity-90">登录博仁医院患者服务平台，管理您的健康档案，预约专家门诊。</p>
           </div>
        </div>

        {/* Right Side: Form - Matches the requested screenshot style */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          
          <div className="mb-8 border-b-2 border-gray-100 pb-2 flex justify-between items-end">
            <h2 className="text-2xl font-bold text-brand-red border-b-2 border-brand-red -mb-2.5 pb-2 inline-block">用户登录</h2>
            <div className="text-sm text-gray-500">还没有账号? <Link to="/register" className="text-blue-600 hover:underline">去注册</Link></div>
          </div>

          <div className="mb-6 relative">
             <div className="absolute -top-10 left-0 bg-brand-red text-white text-xs px-2 py-1 rounded shadow-md animate-bounce">
               普通登录
               <div className="absolute -bottom-1 left-4 w-2 h-2 bg-brand-red rotate-45"></div>
             </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">用户名:</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:border-brand-red transition-colors"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">密 码:</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:outline-none focus:border-brand-red transition-colors"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">验证码:</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={captcha}
                  onChange={e => setCaptcha(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brand-red transition-colors"
                />
                <div className="w-24 h-10 bg-gray-200 flex items-center justify-center font-mono text-xl tracking-widest text-brand-red italic bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] select-none">
                  6205
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
               <a href="#" className="text-blue-600 hover:underline">忘记密码?</a>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button 
              type="submit" 
              className="w-full bg-brand-red hover:bg-brand-darkRed text-white font-bold py-2 rounded transition-colors shadow-lg"
            >
              登 录
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;