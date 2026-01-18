import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, ChevronRight, Activity, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'notice' | 'research' | 'topic'>('news');

  const newsData = {
    news: [
      { id: 1, title: '博仁医院血液科团队在国际顶级期刊发表最新研究成果', date: '10-24' },
      { id: 2, title: '2023年博仁医院年度总结大会圆满召开', date: '12-30' },
      { id: 3, title: '儿童淋巴瘤多学科诊疗中心正式成立', date: '11-05' },
      { id: 4, title: '我院专家受邀参加美国血液学会(ASH)年会并做口头报告', date: '12-15' },
      { id: 5, title: '全国血液病学术研讨会将在我院举行', date: '01-20' },
    ],
    notice: [
      { id: 1, title: '关于2024年春节门诊安排的通知', date: '01-15' },
      { id: 2, title: '就诊流程优化公告', date: '01-10' },
      { id: 3, title: '医保系统升级维护通知', date: '01-05' },
    ],
    research: [
      { id: 1, title: 'CAR-T治疗难治性白血病临床试验招募', date: '11-20' },
      { id: 2, title: '新型靶向药物临床研究项目启动', date: '12-01' },
    ],
    topic: [
      { id: 1, title: '第十届博仁淋巴瘤学术论坛精彩回顾', date: '10-15' },
    ]
  };

  return (
    <div className="bg-white pb-12">
      {/* Top Section: 3 Columns (Reservation | Carousel | Payment) */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 h-[380px]">
          
          {/* Left: Reservation Window */}
          <div className="w-full md:w-[240px] border border-gray-200 flex flex-col shadow-sm">
            <div className="bg-white p-4 h-full flex flex-col">
               {/* Red pill button for Reservation */}
               <Link to="/reservation" className="block bg-brand-red text-white text-center py-2.5 rounded-full font-bold text-lg hover:bg-brand-darkRed transition-colors mb-6 flex items-center justify-center shadow-md">
                 <Clock className="w-5 h-5 mr-2" /> 预约窗口
               </Link>
               
               {/* Quick Links List - Linked to specific tabs in ReservationGuide */}
               <div className="space-y-4 text-sm text-gray-700 flex-1">
                  <Link to="/reservation/specialist" className="flex items-center justify-between border-b border-dashed border-gray-200 pb-2 cursor-pointer hover:text-brand-red transition-colors group">
                    <span className="font-medium group-hover:translate-x-1 transition-transform">专家出诊</span> 
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-red" />
                  </Link>
                  <Link to="/reservation/guide" className="flex items-center justify-between border-b border-dashed border-gray-200 pb-2 cursor-pointer hover:text-brand-red transition-colors group">
                    <span className="font-medium group-hover:translate-x-1 transition-transform">预约指南</span> 
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-red" />
                  </Link>
                  <Link to="/reservation/route" className="flex items-center justify-between border-b border-dashed border-gray-200 pb-2 cursor-pointer hover:text-brand-red transition-colors group">
                    <span className="font-medium group-hover:translate-x-1 transition-transform">来院路线</span> 
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-red" />
                  </Link>
                  <Link to="/reservation/insurance" className="flex items-center justify-between border-b border-dashed border-gray-200 pb-2 cursor-pointer hover:text-brand-red transition-colors group">
                    <span className="font-medium group-hover:translate-x-1 transition-transform">医保政策</span> 
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-red" />
                  </Link>
               </div>

               <div className="mt-4 bg-blue-50 p-3 rounded text-xs text-blue-800 border border-blue-100">
                 <p className="font-bold mb-1 flex items-center"><Activity className="w-3 h-3 mr-1"/> 急诊 24小时</p>
                 <p className="text-lg font-mono font-bold">010-83605002</p>
               </div>
            </div>
          </div>

          {/* Center: Main Visual / Content */}
          <div className="flex-1 bg-gray-100 relative group overflow-hidden border border-gray-200 shadow-sm">
            <img 
              src="https://picsum.photos/800/400?random=10" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              alt="Main Banner" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-6 pt-12">
               <h3 className="text-2xl font-bold mb-2">精诚博爱，仁心仁术</h3>
               <p className="opacity-90 text-sm">北京博仁医院 - 专注于血液病、儿科及综合诊疗的高端医疗机构</p>
            </div>
          </div>

          {/* Right: Payment & Rates */}
          <div className="w-full md:w-[240px] border border-gray-200 flex flex-col shadow-sm">
             <div className="bg-white p-4 h-full flex flex-col">
               {/* Red pill button for Payment */}
               <Link to="/payment" className="block bg-brand-red text-white text-center py-2.5 rounded-full font-bold text-lg hover:bg-brand-darkRed transition-colors mb-6 flex items-center justify-center shadow-md">
                 <CreditCard className="w-5 h-5 mr-2" /> 支付与汇率
               </Link>

               <div className="space-y-3 text-sm flex-1">
                 <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <h4 className="font-bold text-gray-700 mb-2 border-b pb-1 flex justify-between items-center">
                      今日汇率参考
                      <span className="text-[10px] font-normal text-gray-400">实时</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>USD/CNY</span>
                        <span className="font-mono text-brand-red font-bold">7.23</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>EUR/CNY</span>
                        <span className="font-mono text-brand-red font-bold">7.85</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>JPY/CNY</span>
                        <span className="font-mono text-brand-red font-bold">0.048</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>GBP/CNY</span>
                        <span className="font-mono text-brand-red font-bold">9.15</span>
                      </div>
                    </div>
                 </div>

                 <div className="flex items-start space-x-2 text-gray-500 text-xs mt-4">
                   <Info className="w-4 h-4 text-brand-orange flex-shrink-0" />
                   <p>支持微信、支付宝、银联卡及国际信用卡(Visa/Master)支付。</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Middle Section: News Tabs & Health Knowledge */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column (News) - 75% width */}
          <div className="flex-1">
             {/* Tabs Header */}
             <div className="flex items-center border-b border-gray-200 mb-4 overflow-x-auto">
                {['news', 'notice', 'research', 'topic'].map((tab) => (
                  <button 
                    key={tab}
                    className={`text-base md:text-lg font-bold px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-600 hover:text-brand-red'}`}
                    onClick={() => setActiveTab(tab as any)}
                  >
                    {tab === 'news' ? '博仁新闻' : tab === 'notice' ? '通知公告' : tab === 'research' ? '科研动态' : '精彩专题'}
                  </button>
                ))}
                <Link to="/news" className="ml-auto text-xs text-gray-400 hover:text-brand-red whitespace-nowrap pl-4">更多&gt;&gt;</Link>
             </div>

             {/* Content Area */}
             <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[250px]">
                {/* Visual Thumbnail for News */}
                <div className="w-full md:w-2/5 h-48 md:h-full bg-brand-red relative overflow-hidden group cursor-pointer">
                   <img src="https://picsum.photos/400/300?random=2" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="News Feature"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <p className="text-white font-bold line-clamp-2">{newsData[activeTab][0]?.title}</p>
                   </div>
                </div>
                
                {/* News List */}
                <ul className="flex-1 space-y-3 py-1">
                   {newsData[activeTab].map((item, index) => (
                     <li key={item.id} className="flex items-baseline justify-between group cursor-pointer border-b border-dashed border-gray-100 pb-2 last:border-0">
                        <div className="flex items-center">
                          <span className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${index === 0 ? 'bg-brand-red' : 'bg-gray-300'} group-hover:bg-brand-red transition-colors`}></span>
                          <span className="text-sm text-gray-700 group-hover:text-brand-red transition-colors line-clamp-1">{item.title}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono flex-shrink-0 ml-4">{item.date}</span>
                     </li>
                   ))}
                </ul>
             </div>
          </div>

          {/* Right Column (Health Knowledge) - 25% width */}
          <div className="w-full md:w-[280px]">
             <div className="flex justify-between items-end border-b border-gray-200 mb-4 pb-2">
                <h3 className="text-lg font-bold text-gray-800">健康知识</h3>
                <Link to="/health" className="text-xs text-gray-400 hover:text-brand-red">更多&gt;&gt;</Link>
             </div>
             <div className="space-y-3">
               {[1, 2, 3, 4].map((i) => (
                 <Link to="/health/article" key={i} className="border border-gray-200 p-2 flex gap-3 hover:shadow-md transition bg-white group cursor-pointer">
                    <div className="w-20 h-14 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img src={`https://picsum.photos/100/80?random=${i+20}`} className="w-full h-full object-cover group-hover:scale-110 transition" alt=""/>
                    </div>
                    <div className="flex flex-col justify-between py-0.5 w-full">
                      <div className="h-3 w-3/4 bg-gray-200 rounded group-hover:bg-brand-red/10 transition-colors"></div>
                      <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                      <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
                    </div>
                 </Link>
               ))}
             </div>
          </div>

        </div>
      </div>
      
      {/* Bottom Banners Area */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
         <Link to="/careers" className="h-28 bg-white border border-l-4 border-l-brand-red border-gray-200 flex items-center p-6 justify-between group cursor-pointer hover:shadow-md transition">
             <div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-red transition-colors mb-1">人才招聘</h3>
                <p className="text-sm text-gray-500">加入我们，共创未来</p>
             </div>
             <div className="bg-brand-red/10 p-3 rounded-full group-hover:bg-brand-red group-hover:text-white transition-colors">
               <Activity className="w-6 h-6" />
             </div>
         </Link>
         <div className="h-28 bg-white border border-l-4 border-l-brand-orange border-gray-200 flex items-center p-6 justify-between group cursor-pointer hover:shadow-md transition">
             <div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-orange transition-colors mb-1">慈善救助</h3>
                <p className="text-sm text-gray-500">点亮生命希望之光</p>
             </div>
             <div className="bg-brand-orange/10 p-3 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
               <Activity className="w-6 h-6" />
             </div>
         </div>
      </div>

    </div>
  );
};

export default Home;