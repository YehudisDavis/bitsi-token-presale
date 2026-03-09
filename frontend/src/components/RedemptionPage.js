import React, { useState } from 'react';

const RedemptionPage = () => {
  const [voucherId, setVoucherId] = useState('');
  const [signature, setSignature] = useState('');
  const [discount, setDiscount] = useState(0);
  const [nonce, setNonce] = useState('');

  const requestSignature = async () => {
    const response = await fetch('http://localhost:5000/vouchers/redeem-signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wallet: '0x123', voucherId }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setSignature(data.signature);
      setDiscount(data.discount);
      setNonce(data.nonce);
    }
  };

  const submitTransaction = () => {
    // Simulate submitting to contract
    alert('Transaction submitted successfully. Voucher redeemed.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Redeem Voucher</h1>
      <div>
        <label>
          Voucher ID:
          <input value={voucherId} onChange={(e) => setVoucherId(e.target.value)} />
        </label>
        <button onClick={requestSignature}>Request Signature</button>
      </div>
      {signature && (
        <div>
          <p>Signature: {signature}</p>
          <p>Discount: {discount}%</p>
          <p>Nonce: {nonce}</p>
          <button onClick={submitTransaction}>Submit Transaction</button>
        </div>
      )}
    </div>
  );
};

export default RedemptionPage;
