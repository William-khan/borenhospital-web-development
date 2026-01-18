import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorList: React.FC = () => {
  const doctors = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: ['张华', '李明', '王伟', '赵丽', '刘强', '陈红', '杨洋', '周杰'][i],
    title: ['主任医师', '副主任医师', '主治医师'][i % 3],
    dept: ['血液科', '淋巴瘤科', '骨髓移植科'][i % 3],
    specialty: '擅长白血病、淋巴瘤的综合诊疗以及造血干细胞移植。',
    img: `https://i.pravatar.cc/150?u=${i + 10}`
  }));

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-brand-red pl-4">医生介绍</h1>
            <div className="mt-4 md:mt-0 relative">
              <input type="text" placeholder="搜索医生姓名..." className="border rounded-full py-2 px-4 w-64 focus:border-brand-red focus:outline-none" />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
            </div>
          </div>
          
          <div className="flex gap-4 mb-4 text-sm overflow-x-auto pb-2">
            <span className="font-bold text-gray-700 whitespace-nowrap">按科室筛选:</span>
            {['全部', '血液科', '淋巴瘤科', '骨髓移植科', '儿科', '病理科', '影像科'].map((d, i) => (
              <button key={i} className={`px-3 py-0.5 rounded-full whitespace-nowrap ${i === 0 ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group border border-gray-100">
              <div className="h-2 bg-brand-red w-0 group-hover:w-full transition-all duration-300"></div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 group-hover:border-brand-red transition-colors">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{doc.name}</h3>
                <p className="text-brand-red text-xs font-bold mb-2">{doc.title} | {doc.dept}</p>
                <p className="text-xs text-gray-500 line-clamp-3 mb-4">{doc.specialty}</p>
                <button className="text-sm border border-brand-red text-brand-red px-6 py-1.5 rounded hover:bg-brand-red hover:text-white transition-colors">
                  预约挂号
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;