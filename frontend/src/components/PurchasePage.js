import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const vouchers = [
  { id: 1, price: 100, buyingPower: 150, discount: '50% bonus' },
  { id: 2, price: 500, buyingPower: 800, discount: '60% bonus' },
  { id: 3, price: 1000, buyingPower: 1700, discount: '70% bonus' },
  { id: 4, price: 10000, buyingPower: 'custom', discount: 'special' },
];

const PurchasePage = () => {
  const { voucherId } = useParams();
  const voucher = vouchers.find(v => v.id === parseInt(voucherId));

  const [paymentToken, setPaymentToken] = useState('ETH');
  const [walletConnected, setWalletConnected] = useState(false);

  if (!voucher) {
    return <div>Voucher not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Purchase Voucher</h1>
      <div>
        <h3>Selected Voucher: ${voucher.price}</h3>
        <p>Buying Power: ${voucher.buyingPower}</p>
        <p>Discount: {voucher.discount}</p>
      </div>
      <div>
        <p>Payment Amount: ${voucher.price}</p>
        <label>
          Payment Token:
          <select value={paymentToken} onChange={(e) => setPaymentToken(e.target.value)}>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="STRK">STRK</option>
          </select>
        </label>
      </div>
      <div>
        <p>Connected Wallet: {walletConnected ? '0x123...abc' : 'Not connected'}</p>
        {!walletConnected && <button onClick={() => setWalletConnected(true)}>Connect Wallet</button>}
      </div>
      <button disabled={!walletConnected}>Confirm Purchase</button>
    </div>
  );
};

export default PurchasePage;
