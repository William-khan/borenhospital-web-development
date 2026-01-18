import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AiAssistant from './components/AiAssistant';
import GenericPage from './pages/GenericPage';
import DoctorList from './pages/DoctorList';
import ReservationGuide from './pages/ReservationGuide';
import PaymentPage from './pages/PaymentPage';
import { AuthState } from './types';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.GUEST);
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <Router>
      <Layout authState={authState} setAuthState={setAuthState} toggleAi={() => setIsAiOpen(!isAiOpen)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setAuthState={setAuthState} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={authState === AuthState.LOGGED_IN ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          {/* Specialized Pages */}
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/reservation/*" element={<ReservationGuide />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Generic Text/Sidebar Pages */}
          <Route path="/about/*" element={<GenericPage />} />
          <Route path="/departments/*" element={<GenericPage />} />
          <Route path="/dept/*" element={<GenericPage />} />
          <Route path="/research/*" element={<GenericPage />} />
          <Route path="/services/*" element={<GenericPage />} />
          <Route path="/news/*" element={<GenericPage />} />
          <Route path="/international-patients/*" element={<GenericPage />} />
          <Route path="/careers/*" element={<GenericPage />} />
          <Route path="/health/*" element={<GenericPage />} />

          <Route path="*" element={<div className="p-12 text-center text-gray-500">页面不存在 <br/><a href="/" className="text-brand-red underline">返回首页</a></div>} />
        </Routes>
      </Layout>
      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </Router>
  );
};

export default App;