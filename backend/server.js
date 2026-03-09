const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const vouchersOptions = [
  { id: 1, price: 100, buyingPower: 150, discount: '50% bonus' },
  { id: 2, price: 500, buyingPower: 800, discount: '60% bonus' },
  { id: 3, price: 1000, buyingPower: 1700, discount: '70% bonus' },
  { id: 4, price: 10000, buyingPower: 'custom', discount: 'special' },
];

const vouchers = [
  { id: 'v1', wallet: '0x123', amount_paid: 100, buying_power: 150, discount_percent: 50, status: 'ACTIVE', created_at: '2023-01-01' },
  { id: 'v2', wallet: '0x123', amount_paid: 500, buying_power: 800, discount_percent: 60, status: 'REDEEMED', created_at: '2023-01-02' },
];

app.get('/vouchers/options', (req, res) => {
  res.json(vouchersOptions);
});

app.get('/vouchers/user/:wallet', (req, res) => {
  const wallet = req.params.wallet;
  const userVouchers = vouchers.filter(v => v.wallet === wallet);
  res.json(userVouchers);
});

app.post('/vouchers/redeem-signature', (req, res) => {
  const { wallet, voucherId } = req.body;
  const voucher = vouchers.find(v => v.id === voucherId && v.wallet === wallet && v.status === 'ACTIVE');
  if (!voucher) {
    return res.status(400).json({ error: 'Voucher not found or not eligible' });
  }
  // Mock signature, discount, nonce
  const signature = 'mock_signature_' + voucherId;
  const discount = voucher.discount_percent;
  const nonce = 'nonce_' + Date.now();
  res.json({ signature, discount, nonce });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
