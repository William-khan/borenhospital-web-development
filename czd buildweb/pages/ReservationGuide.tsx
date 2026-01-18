import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Map, FileText, CreditCard } from 'lucide-react';

const ReservationGuide: React.FC = () => {
  const location = useLocation();
  const subPage = location.pathname.split('/').pop() || 'guide';

  const renderContent = () => {
    switch (subPage) {
      case 'specialist':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">专家出诊表</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border p-3 text-left">科室</th>
                    <th className="border p-3 text-left">专家</th>
                    <th className="border p-3 text-center">周一</th>
                    <th className="border p-3 text-center">周二</th>
                    <th className="border p-3 text-center">周三</th>
                    <th className="border p-3 text-center">周四</th>
                    <th className="border p-3 text-center">周五</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">血液科</td>
                    <td className="border p-3 font-bold">张华</td>
                    <td className="border p-3 text-center text-brand-red">上午</td>
                    <td className="border p-3 text-center"></td>
                    <td className="border p-3 text-center text-brand-red">下午</td>
                    <td className="border p-3 text-center"></td>
                    <td className="border p-3 text-center"></td>
                  </tr>
                  <tr>
                    <td className="border p-3">淋巴瘤科</td>
                    <td className="border p-3 font-bold">李明</td>
                    <td className="border p-3 text-center"></td>
                    <td className="border p-3 text-center text-brand-red">上午</td>
                    <td className="border p-3 text-center"></td>
                    <td className="border p-3 text-center text-brand-red">全天</td>
                    <td className="border p-3 text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'route':
        return (
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4">来院路线</h2>
             <div className="bg-gray-100 h-64 flex items-center justify-center mb-6">
               <span className="text-gray-400">地图组件加载中... (模拟)</span>
             </div>
             <div className="space-y-4">
               <div className="bg-white p-4 border rounded">
                 <h4 className="font-bold mb-2">公交路线</h4>
                 <p className="text-sm text-gray-600">乘坐 49, 353, 691, 692 路公交车，在“纪家庙”站下车，步行200米即到。</p>
               </div>
               <div className="bg-white p-4 border rounded">
                 <h4 className="font-bold mb-2">地铁路线</h4>
                 <p className="text-sm text-gray-600">乘坐地铁10号线，在“首经贸”站下车，C口出，向南步行800米。</p>
               </div>
             </div>
          </div>
        );
      case 'insurance':
        return (
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4">医保政策</h2>
             <p className="mb-4 text-gray-600">我院为北京市医保定点医疗机构，持卡就医可实时结算。</p>
             <ul className="list-disc pl-5 space-y-2 text-gray-600">
               <li>本市参保人员：无需定点，直接持社保卡就医。</li>
               <li>异地参保人员：需在参保地办理异地就医备案手续，持社保卡联网结算。</li>
             </ul>
          </div>
        );
      default: // guide
        return (
          <div>
             <h2 className="text-2xl font-bold text-gray-800 mb-4">预约指南</h2>
             <div className="space-y-6">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-lg">实名制注册</h4>
                    <p className="text-gray-600 text-sm">请使用患者本人的身份证信息进行注册。</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-lg">选择科室与医生</h4>
                    <p className="text-gray-600 text-sm">根据病情选择相应的科室和专家。</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-lg">支付挂号费</h4>
                    <p className="text-gray-600 text-sm">支持微信、支付宝在线支付。</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-lg">按时就诊</h4>
                    <p className="text-gray-600 text-sm">请按照预约时间提前15分钟到达医院候诊区。</p>
                  </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
       <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-[250px] flex-shrink-0">
             <div className="bg-white shadow rounded overflow-hidden">
                <div className="bg-brand-red text-white p-4 font-bold text-lg text-center">就医导航</div>
                <div className="divide-y divide-gray-100">
                  <Link to="/reservation/guide" className={`block p-4 hover:bg-gray-50 flex items-center ${subPage === 'guide' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    <FileText className="w-4 h-4 mr-3" /> 预约指南
                  </Link>
                  <Link to="/reservation/specialist" className={`block p-4 hover:bg-gray-50 flex items-center ${subPage === 'specialist' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    <Calendar className="w-4 h-4 mr-3" /> 专家出诊
                  </Link>
                  <Link to="/reservation/route" className={`block p-4 hover:bg-gray-50 flex items-center ${subPage === 'route' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    <Map className="w-4 h-4 mr-3" /> 来院路线
                  </Link>
                  <Link to="/reservation/insurance" className={`block p-4 hover:bg-gray-50 flex items-center ${subPage === 'insurance' ? 'text-brand-red font-bold' : 'text-gray-700'}`}>
                    <CreditCard className="w-4 h-4 mr-3" /> 医保政策
                  </Link>
                </div>
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white shadow rounded p-8">
             {renderContent()}
          </div>
       </div>
    </div>
  );
};

export default ReservationGuide;