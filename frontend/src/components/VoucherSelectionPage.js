import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VoucherSelectionPage = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/vouchers/options')
      .then(res => res.json())
      .then(data => setVouchers(data));
  }, []);

  return (
    <div className="App-header" style={{ minHeight: '100vh' }}>
      <h1 className="heading-main">Select Your Voucher</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
        {vouchers.map(voucher => (
          <div key={voucher.id} className="card" style={{ width: '260px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>Voucher ${voucher.price}</h3>
            <p className="subtext">Get ${voucher.buyingPower} buying power</p>
            <p style={{ color: '#00bcd4', fontWeight: 'bold', marginBottom: '16px' }}>{voucher.discount}</p>
            <Link to={`/purchase/${voucher.id}`}>
              <button className="button-primary" style={{ width: '100%' }}>
                Purchase
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherSelectionPage;
