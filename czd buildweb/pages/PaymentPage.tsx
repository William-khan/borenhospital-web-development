import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

const PaymentPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-8 border-brand-red pl-4">支付与汇率</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Exchange Rates */}
           <div className="bg-white p-6 rounded shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                 <DollarSign className="w-5 h-5 mr-2 text-brand-red" /> 实时汇率参考
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">货币对</th>
                      <th className="p-3 text-right">买入价</th>
                      <th className="p-3 text-right">卖出价</th>
                      <th className="p-3 text-right">中间价</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="p-3 font-bold">USD / CNY</td><td className="p-3 text-right">7.21</td><td className="p-3 text-right">7.25</td><td className="p-3 text-right text-brand-red font-bold">7.23</td></tr>
                    <tr><td className="p-3 font-bold">EUR / CNY</td><td className="p-3 text-right">7.82</td><td className="p-3 text-right">7.88</td><td className="p-3 text-right text-brand-red font-bold">7.85</td></tr>
                    <tr><td className="p-3 font-bold">JPY / CNY</td><td className="p-3 text-right">0.047</td><td className="p-3 text-right">0.049</td><td className="p-3 text-right text-brand-red font-bold">0.048</td></tr>
                    <tr><td className="p-3 font-bold">GBP / CNY</td><td className="p-3 text-right">9.10</td><td className="p-3 text-right">9.20</td><td className="p-3 text-right text-brand-red font-bold">9.15</td></tr>
                    <tr><td className="p-3 font-bold">HKD / CNY</td><td className="p-3 text-right">0.92</td><td className="p-3 text-right">0.93</td><td className="p-3 text-right text-brand-red font-bold">0.925</td></tr>
                    <tr><td className="p-3 font-bold">AUD / CNY</td><td className="p-3 text-right">4.70</td><td className="p-3 text-right">4.78</td><td className="p-3 text-right text-brand-red font-bold">4.74</td></tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-4">* 以上数据仅供参考，实际交易以银行柜台成交价为准。</p>
              </div>
           </div>

           {/* Payment Methods */}
           <div className="bg-white p-6 rounded shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                 <CreditCard className="w-5 h-5 mr-2 text-brand-red" /> 支付方式
              </h2>
              <div className="space-y-6">
                 <div className="p-4 border border-gray-100 rounded-lg hover:border-brand-red transition-colors cursor-pointer">
                    <h3 className="font-bold mb-2">移动支付</h3>
                    <p className="text-sm text-gray-600 mb-2">推荐使用，安全快捷。</p>
                    <div className="flex space-x-2">
                       <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">微信支付</span>
                       <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">支付宝</span>
                    </div>
                 </div>

                 <div className="p-4 border border-gray-100 rounded-lg hover:border-brand-red transition-colors cursor-pointer">
                    <h3 className="font-bold mb-2">银行卡支付</h3>
                    <p className="text-sm text-gray-600 mb-2">支持带有银联标识的借记卡和信用卡。</p>
                    <div className="flex space-x-2">
                       <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">银联 UnionPay</span>
                    </div>
                 </div>

                 <div className="p-4 border border-gray-100 rounded-lg hover:border-brand-red transition-colors cursor-pointer">
                    <h3 className="font-bold mb-2">国际支付</h3>
                    <p className="text-sm text-gray-600 mb-2">支持主要国际信用卡组织。</p>
                    <div className="flex space-x-2">
                       <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">VISA</span>
                       <span className="bg-orange-50 text-orange-800 text-xs px-2 py-1 rounded">MasterCard</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;