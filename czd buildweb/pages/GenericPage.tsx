import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';

// Data structure for Sidebars
const sidebarConfig: Record<string, any[]> = {
  about: [
    { 
      name: '医院简介', 
      path: '/about/introduction', 
      // The user specifically requested these sub-items for "Hospital Introduction"
      children: [
        { name: '科室介绍', path: '/about/introduction/departments' },
        { name: '博仁风采', path: '/about/introduction/style' }
      ]
    },
    { name: '发展历程', path: '/about/history' },
    { name: '重点学科', path: '/about/disciplines' },
    { name: '国际合作', path: '/about/international' }
  ],
  departments: [
    { name: '血液/肿瘤科', path: '/dept/hematology' },
    { name: '造血干细胞移植科', path: '/dept/transplant' },
    { name: '儿童血液/肿瘤科', path: '/dept/pediatric' },
    { name: '骨髓瘤淋巴瘤科', path: '/dept/lymphoma' },
    { name: '贫血诊疗中心', path: '/dept/anemia' },
    { name: '医学检验科', path: '/dept/lab' }
  ],
  services: [
    { name: '就医指南', path: '/services/guide' },
    { name: '医保政策', path: '/services/insurance' },
    { name: '来院路线', path: '/services/route' },
    { name: '远程会诊', path: '/services/remote' }
  ]
};

const GenericPage: React.FC = () => {
  const location = useLocation();
  // Get the first path segment to determine the section (about, dept, services, etc.)
  const section = location.pathname.split('/')[1] || 'about'; 
  const currentPath = location.pathname;
  
  // Resolve sidebar items, default to simple list if not defined
  const sidebarItems = sidebarConfig[section] || [
    { name: '概览', path: `/${section}` }
  ];

  // Logic to determine the active title and content
  const getActiveItemName = () => {
    // Flatten the tree to find the active item
    const flatItems = sidebarItems.flatMap(item => item.children ? [item, ...item.children] : [item]);
    const active = flatItems.find(item => item.path === currentPath);
    return active ? active.name : '详细信息';
  };

  const title = getActiveItemName();
  const categoryName = section === 'about' ? '关于博仁' : section === 'departments' || section === 'dept' ? '科室介绍' : '频道首页';

  return (
    <div className="bg-white min-h-[800px] py-8 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-[260px] flex-shrink-0">
          <div className="bg-brand-red text-white text-xl font-bold py-4 px-6 mb-1 rounded-t-sm">
             {categoryName}
          </div>
          <div className="bg-gray-50 border border-gray-200 min-h-[300px]">
             <ul className="flex flex-col">
               {sidebarItems.map((item, index) => {
                 const isActive = currentPath.startsWith(item.path);
                 const hasChildren = item.children && item.children.length > 0;

                 return (
                   <li key={index} className="relative group border-b border-gray-200 last:border-0">
                     <Link 
                       to={item.path}
                       className={`block py-4 px-6 text-sm font-medium transition-colors flex justify-between items-center
                         ${isActive ? 'text-brand-red bg-white border-l-4 border-brand-red' : 'text-gray-700 hover:bg-white hover:text-brand-red'}
                       `}
                     >
                       {item.name}
                       {hasChildren && <ChevronRight className="w-4 h-4 text-gray-400" />}
                     </Link>

                     {/* Nested Menu (Hover or Active) - User Request "2.png" */}
                     {hasChildren && (
                       <div className="hidden group-hover:block absolute left-full top-0 w-48 bg-white border border-gray-200 shadow-xl z-10">
                         {item.children.map((child: any, cIndex: number) => (
                           <Link
                             key={cIndex}
                             to={child.path}
                             className="block py-3 px-5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-red border-b border-gray-100 last:border-0"
                           >
                             {child.name}
                           </Link>
                         ))}
                       </div>
                     )}
                   </li>
                 );
               })}
             </ul>
          </div>
          
          <div className="mt-6 bg-white border border-gray-200 p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">联系我们</h4>
            <div className="space-y-3 text-xs text-gray-600">
               <div className="flex items-start">
                 <MapPin className="w-4 h-4 mr-2 text-brand-red flex-shrink-0" />
                 <span>北京市丰台区纪家庙路</span>
               </div>
               <div className="flex items-center">
                 <Phone className="w-4 h-4 mr-2 text-brand-red flex-shrink-0" />
                 <span>010-83605002</span>
               </div>
               <div className="flex items-center">
                 <Mail className="w-4 h-4 mr-2 text-brand-red flex-shrink-0" />
                 <span>info@borenhospital.com</span>
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
           {/* Breadcrumb inside page */}
           <div className="text-xs text-gray-500 mb-4 flex items-center">
             <span>当前位置：</span>
             <Link to="/" className="hover:text-brand-red">首页</Link>
             <span className="mx-2">/</span>
             <span>{categoryName}</span>
             <span className="mx-2">/</span>
             <span className="text-brand-red font-bold">{title}</span>
           </div>

           <div className="border-b border-gray-200 pb-4 mb-8">
             <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
           </div>
           
           <div className="prose max-w-none text-gray-600 leading-relaxed">
              {/* Dynamic Content Simulation */}
              {title === '科室介绍' || currentPath.includes('/departments') ? (
                 <div className="grid grid-cols-2 gap-6">
                    {/* Simulating the boxes in Image 3.png */}
                    {['血液/肿瘤科', '造血干细胞移植科', '儿童血液/肿瘤科', '骨髓瘤淋巴瘤科', '贫血诊疗中心', '医学检验科'].map((dept) => (
                       <div key={dept} className="border p-4 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center">
                          <div className="w-full h-32 bg-gray-100 mb-3 flex items-center justify-center text-gray-300">科室图片</div>
                          <h3 className="font-bold text-lg text-gray-800">{dept}</h3>
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">专注于{dept}的临床诊断与治疗，拥有国际顶尖的专家团队。</p>
                          <Link to={`/dept/${dept}`} className="mt-3 text-xs text-white bg-brand-red px-4 py-1.5 rounded-full hover:bg-brand-darkRed">查看详情</Link>
                       </div>
                    ))}
                 </div>
              ) : (
                <>
                  <div className="float-right w-1/3 ml-6 mb-6">
                     <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 border">
                        {title} 相关图片
                     </div>
                  </div>
                  <p className="mb-4">
                    北京博仁医院是一家集临床诊疗、医学科研、医学教育为一体的二级综合医院。医院坐落于北京市丰台区，占地面积广阔，环境优美。
                  </p>
                  <p className="mb-4">
                    <strong>{title}</strong> 始终坚持"患者至上，生命至上"的服务理念，不断提升医疗技术水平，加强学科建设和人才培养。我们引进了国际先进的医疗设备，汇聚了众多国内知名的专家学者，致力于打造国内一流、国际知名的医疗中心。
                  </p>
                  <p className="mb-4">
                     在未来的发展中，我们将继续秉承优良传统，锐意进取，开拓创新，为广大患者提供更加优质、高效、便捷的医疗服务，为健康中国建设贡献力量。
                  </p>
                  <div className="clear-both"></div>
                  
                  {/* Additional Content Blocks for realism */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-gray-50 p-4 border-l-4 border-brand-red">
                        <h4 className="font-bold mb-2">我们的愿景</h4>
                        <p className="text-sm">成为血液病诊疗领域的国际领跑者。</p>
                     </div>
                     <div className="bg-gray-50 p-4 border-l-4 border-brand-orange">
                        <h4 className="font-bold mb-2">我们的使命</h4>
                        <p className="text-sm">用仁心仁术守护每一位患者的生命健康。</p>
                     </div>
                  </div>
                </>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default GenericPage;