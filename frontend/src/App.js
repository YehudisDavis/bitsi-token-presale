import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import VoucherSelectionPage from './components/VoucherSelectionPage';
import PurchasePage from './components/PurchasePage';
import MyCouponsPage from './components/MyCouponsPage';
import RedemptionPage from './components/RedemptionPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vouchers" element={<VoucherSelectionPage />} />
          <Route path="/purchase/:voucherId" element={<PurchasePage />} />
          <Route path="/coupons" element={<MyCouponsPage />} />
          <Route path="/redeem" element={<RedemptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
