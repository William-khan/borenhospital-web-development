import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

const Register: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 md:p-12">
        <div className="mb-8 border-b border-gray-200 pb-2 flex justify-between items-end">
           <h2 className="text-2xl font-bold text-brand-red border-b-2 border-brand-red -mb-2.5 pb-2 inline-block">用户注册</h2>
           <div className="text-sm text-gray-500">如已有账号，请直接 <Link to="/login" className="text-blue-600 hover:underline">登录</Link></div>
        </div>

        <form className="max-w-lg mx-auto space-y-6">
           {/* Username */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
             <label className="text-right font-medium text-gray-700 md:col-span-1">用户名</label>
             <div className="md:col-span-3">
               <input type="text" className="w-full border border-gray-300 rounded p-2 focus:border-brand-red focus:outline-none" />
               <p className="text-brand-red text-xs mt-1">包括汉字、字母、数字、下划线</p>
             </div>
           </div>

           {/* Password */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
             <label className="text-right font-medium text-gray-700 md:col-span-1 pt-2">密 码 <span className="text-red-500">*</span></label>
             <div className="md:col-span-3 relative">
               <input type="password" className="w-full border border-gray-300 rounded p-2 focus:border-brand-red focus:outline-none" />
               <p className="text-brand-red text-xs mt-1">请使用 "强" 级别的密码</p>
               
               {/* Tooltip mimicking screenshot */}
               <div className="absolute left-full top-0 ml-4 w-48 bg-gray-50 border border-gray-200 p-2 rounded text-xs text-gray-600 hidden lg:block">
                  <div className="flex items-center mb-1"><Info className="w-3 h-3 mr-1 text-blue-500"/> 长度为10-16个字符</div>
                  <div className="flex items-center"><Info className="w-3 h-3 mr-1 text-blue-500"/> 不能是10位以下纯数字</div>
               </div>
             </div>
           </div>

           {/* Confirm Password */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
             <label className="text-right font-medium text-gray-700 md:col-span-1">确认密码 <span className="text-red-500">*</span></label>
             <div className="md:col-span-3">
               <input type="password" className="w-full border border-gray-300 rounded p-2 focus:border-brand-red focus:outline-none" />
             </div>
           </div>

            {/* Captcha */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
             <label className="text-right font-medium text-gray-700 md:col-span-1">验证码</label>
             <div className="md:col-span-3 flex items-center space-x-2">
               <input type="text" className="w-32 border border-gray-300 rounded p-2 focus:border-brand-red focus:outline-none" />
               <div className="h-10 px-4 bg-gray-200 flex items-center font-mono text-xl tracking-widest text-brand-red italic select-none">
                  6205
                </div>
             </div>
           </div>

           {/* Submit */}
           <div className="flex flex-col items-center justify-center pt-4">
             <button className="bg-brand-red hover:bg-brand-darkRed text-white font-bold py-2 px-12 rounded shadow transition-colors">
               同意以下条款并注册
             </button>
             <a href="#" className="text-blue-600 text-sm mt-4 hover:underline">用户注册条款</a>
           </div>

        </form>
      </div>
    </div>
  );
};

export default Register;