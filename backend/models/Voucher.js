const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  wallet: { type: String, required: true },
  amount_paid: { type: Number, required: true },
  buying_power: { type: Number, required: true },
  discount_percent: { type: Number, required: true },
  status: { type: String, enum: ['ACTIVE', 'REDEEMED', 'CANCELLED', 'EXPIRED'], default: 'ACTIVE' },
  created_at: { type: Date, default: Date.now },
  redeemed_at: { type: Date }
});

module.exports = mongoose.model('Voucher', voucherSchema);
