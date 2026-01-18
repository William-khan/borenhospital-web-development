import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, User, Search, Menu, X, ChevronRight, Activity, MessageSquare, ChevronDown } from 'lucide-react';
import { AuthState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  toggleAi: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, authState, setAuthState, toggleAi }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthState(AuthState.GUEST);
    navigate('/');
  };

  // Navigation Data Structure based on screenshots
  const navStructure = [
    { name: '首页', path: '/' },
    { 
      name: '关于博仁', 
      path: '/about',
      dropdown: [
        { name: '医院简介', path: '/about/introduction' },
        { name: '发展历程', path: '/about/history' },
        { name: '重点学科', path: '/about/disciplines' },
        { name: '国际合作', path: '/about/international' }
      ]
    },
    { name: '医生介绍', path: '/doctors' },
    { 
      name: '病种与治疗中心', 
      path: '/departments',
      dropdown: [
        { name: '血液/肿瘤科', path: '/dept/hematology' },
        { name: '造血干细胞移植科', path: '/dept/transplant' },
        { name: '儿童血液/肿瘤科', path: '/dept/pediatric' },
        { name: '骨髓瘤淋巴瘤科', path: '/dept/lymphoma' },
        { name: '贫血诊疗中心', path: '/dept/anemia' },
        { name: '医学检验科', path: '/dept/lab' }
      ]
    },
    { name: '临床实验', path: '/research' },
    { name: '患者服务', path: '/services' },
    { name: '资讯中心', path: '/news' },
    { name: '国际患者服务', path: '/international-patients' },
    { name: '多语言AI客服', path: '#', action: toggleAi }, // Trigger AI directly
    { name: '招聘与合作', path: '/careers' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Top Utility Bar */}
      <div className="bg-white border-b border-gray-100 py-2 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center h-16">
           {/* Logo Area */}
          <Link to="/" className="flex items-center space-x-3">
             <div className="bg-brand-red text-white p-2 rounded shadow-sm">
                <Activity className="w-6 h-6" />
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 leading-none">博仁医院</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">GoBroad Healthcare Group</span>
             </div>
          </Link>

          {/* Right Utilities */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
             <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span className="font-bold text-lg">010-83605002</span>
             </div>
             <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>|</span>
                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">微博</div>
                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">微信</div>
             </div>
             <div className="flex items-center space-x-2">
                {authState === AuthState.LOGGED_IN ? (
                  <>
                     <Link to="/dashboard" className="text-brand-red font-bold flex items-center"><User className="w-4 h-4 mr-1"/> 个人中心</Link>
                     <button onClick={handleLogout}>退出</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="hover:text-brand-red">登录</Link>
                    <span>|</span>
                    <Link to="/register" className="hover:text-brand-red">注册</Link>
                  </>
                )}
             </div>
             <button className="text-gray-800 font-medium">English</button>
             
             {/* Search Bar */}
             <div className="relative">
                <input 
                  type="text" 
                  className="border-2 border-gray-800 rounded-full py-1 pl-4 pr-10 w-48 focus:outline-none focus:border-brand-red transition-colors"
                />
                <Search className="w-5 h-5 absolute right-3 top-1.5 text-gray-800" />
             </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-brand-red text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1200px] mx-auto px-4">
           <div className="flex justify-between md:hidden py-3">
             <span className="font-bold text-lg">菜单</span>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
             </button>
           </div>

           <ul className={`md:flex md:space-x-0 text-sm font-medium ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
              {navStructure.map((item, index) => (
                <li key={index} className="group relative md:flex-1 text-center">
                  {item.action ? (
                     <button 
                       onClick={item.action}
                       className="w-full h-full block py-3 md:py-4 px-2 hover:bg-brand-darkRed transition-colors flex items-center justify-center"
                     >
                       {item.name}
                     </button>
                  ) : (
                    <Link 
                      to={item.path} 
                      className="block py-3 md:py-4 px-2 hover:bg-brand-darkRed transition-colors flex items-center justify-center"
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown className="w-3 h-3 ml-1 opacity-70" />}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="hidden group-hover:block absolute top-full left-0 w-48 bg-white text-gray-800 shadow-xl border-t-2 border-brand-red z-50 text-left">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link 
                          key={subIndex} 
                          to={subItem.path} 
                          className="block px-4 py-3 hover:bg-gray-50 hover:text-brand-red border-b border-gray-100 last:border-0 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
           </ul>
        </div>
      </nav>

      {/* Breadcrumbs - Only show on inner pages */}
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/dashboard' && (
         <div className="bg-gray-50 border-b">
           <div className="max-w-[1200px] mx-auto px-4 py-3 text-xs text-gray-500 flex items-center">
             <span className="text-gray-400 mr-2">您所在位置:</span>
             <Link to="/" className="hover:text-brand-red">首页</Link>
             {location.pathname.split('/').filter(Boolean).map((path, index) => (
                <React.Fragment key={index}>
                  <span className="mx-2 text-gray-300">&gt;&gt;</span>
                  <span className="capitalize text-gray-800">
                    {/* Simple mapping for demo purposes */}
                    {path === 'about' ? '关于博仁' : 
                     path === 'introduction' ? '医院简介' :
                     path === 'history' ? '发展历程' :
                     path === 'departments' ? '病种与治疗中心' :
                     path === 'news' ? '资讯中心' :
                     path === 'hematology' ? '血液/肿瘤科' :
                     path}
                  </span>
                </React.Fragment>
             ))}
           </div>
         </div>
      )}

      {/* Main Content */}
      <main className="flex-grow bg-white">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-center py-8 text-sm text-gray-600 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 space-y-2">
          <div className="flex justify-center space-x-4 mb-4 font-medium">
             <Link to="/about" className="hover:text-brand-red">关于我们</Link>
             <span>|</span>
             <Link to="/services" className="hover:text-brand-red">就医导航</Link>
             <span>|</span>
             <Link to="/services" className="hover:text-brand-red">患者服务</Link>
             <span>|</span>
             <Link to="/news" className="hover:text-brand-red">医院新闻</Link>
             <span>|</span>
             <Link to="/health" className="hover:text-brand-red">健康科普</Link>
             <span>|</span>
             <Link to="/careers" className="hover:text-brand-red">加入我们</Link>
          </div>
          <p>地址: 北京市丰台区纪家庙路  咨询电话: 010-83605002 / 010-83605200 邮编: 100070</p>
          <div className="flex justify-center items-center space-x-2">
             <span>京卫网审字(2015)0050号</span>
             <a href="#" className="underline hover:text-brand-red">京ICP备15011540号</a>
             <span>(京) 医广【2018】第12-05-0977号</span>
             <span className="flex items-center"><img src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" className="w-4 h-4 mr-1" alt=""/> 京公网安备11010602050084号</span>
          </div>
          <p className="mt-2 text-gray-400">北京高博博仁医院版权所有</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;