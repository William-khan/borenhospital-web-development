import React from 'react';
import { User, FileText, Calendar, MessageSquare, Phone, Activity, Heart, Smartphone, Monitor } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1月', value: 85 },
  { name: '2月', value: 88 },
  { name: '3月', value: 82 },
  { name: '4月', value: 90 },
  { name: '5月', value: 95 },
  { name: '6月', value: 92 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Red Header Bar mimicking screenshot */}
      <div className="bg-brand-red text-white">
        <div className="max-w-7xl mx-auto px-4 flex">
           <div className="py-4 px-6 border-b-4 border-white font-bold text-lg cursor-pointer">个人信息</div>
           <div className="py-4 px-6 hover:bg-brand-darkRed cursor-pointer transition">就诊服务</div>
           <div className="py-4 px-6 hover:bg-brand-darkRed cursor-pointer transition">报告查询</div>
           <div className="py-4 px-6 hover:bg-brand-darkRed cursor-pointer transition">健康档案</div>
           <div className="py-4 px-6 hover:bg-brand-darkRed cursor-pointer transition">在线热线</div>
           <div className="py-4 px-6 hover:bg-brand-darkRed cursor-pointer transition">缴费记录</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Large Tile - Profile */}
          <div className="bg-brand-orange text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4 hover:shadow-xl transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform"></div>
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30">
                <User className="w-12 h-12 text-gray-400" />
             </div>
             <h3 className="text-2xl font-bold">头像</h3>
             <p className="text-lg">姓名: 张某某</p>
             <button className="mt-4 bg-white text-brand-orange px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
               卡号: 10002934
             </button>
          </div>

          {/* Middle Tile - Online Service */}
          <div className="bg-brand-orangeDark text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            <User className="w-16 h-16 mb-4" />
            <div className="absolute top-1/2 left-1/2 ml-4 mt-4 bg-white text-brand-orange rounded-full p-1"><Activity className="w-4 h-4"/></div>
            <h3 className="text-2xl font-bold">在线服务</h3>
            <p className="opacity-80 mt-2">点击咨询医生</p>
          </div>

          {/* Right Column - Split Tiles */}
          <div className="space-y-6">
             {/* Top Right */}
             <div className="bg-brand-orangeDark p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-brand-orange transition cursor-pointer h-[48%]">
                <Smartphone className="w-12 h-12 text-white/80" />
                <div className="text-right text-white">
                  <h3 className="text-xl font-bold">健康管理</h3>
                  <p className="text-sm opacity-90">可查看/下载</p>
                </div>
             </div>
             {/* Bottom Right */}
             <div className="bg-brand-orangeDark p-6 rounded-lg shadow-lg flex items-center justify-between hover:bg-brand-orange transition cursor-pointer h-[48%]">
                <Monitor className="w-12 h-12 text-white/80" />
                 <div className="text-right text-white">
                  <h3 className="text-xl font-bold">体检提醒</h3>
                  <p className="text-sm opacity-90">用药记录</p>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Row Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
           <div className="bg-brand-orangeDark p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-white hover:translate-y-[-5px] transition cursor-pointer">
              <div className="p-4 bg-white/20 rounded-full mb-4"><FileText className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold">我的就诊</h3>
              <p className="opacity-80">使期预约</p>
           </div>

           <div className="bg-brand-orangeDark p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-white hover:translate-y-[-5px] transition cursor-pointer">
              <div className="p-4 bg-white/20 rounded-full mb-4"><Calendar className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold">历史记录</h3>
              <p className="opacity-80">检查报告</p>
           </div>

           <div className="bg-brand-orangeDark p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-white hover:translate-y-[-5px] transition cursor-pointer">
              <div className="p-4 bg-white/20 rounded-full mb-4"><Heart className="w-10 h-10" /></div>
              <h3 className="text-xl font-bold">医生咨询入口</h3>
              <p className="opacity-80">智能导诊</p>
           </div>
        </div>

        {/* Health Trend Chart - The "Professional" Touch */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-md border border-gray-200">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-gray-800 border-l-4 border-brand-red pl-3">健康指数趋势</h3>
             <span className="text-sm text-gray-500">最近6个月</span>
           </div>
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                 <XAxis dataKey="name" stroke="#9ca3af" />
                 <YAxis stroke="#9ca3af" />
                 <Tooltip />
                 <Line type="monotone" dataKey="value" stroke="#D31118" strokeWidth={3} activeDot={{ r: 8 }} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;