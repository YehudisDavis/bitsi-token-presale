import React, { useState, useEffect } from 'react';

const MyCouponsPage = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/vouchers/user/0x123')
      .then(res => res.json())
      .then(data => setVouchers(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Coupons</h1>
      <div>
        {vouchers.map(voucher => (
          <div key={voucher.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>Voucher ID: {voucher.id}</p>
            <p>Amount Paid: ${voucher.amount_paid}</p>
            <p>Buying Power: ${voucher.buying_power}</p>
            <p>Status: {voucher.status}</p>
            <p>Created At: {voucher.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCouponsPage;
