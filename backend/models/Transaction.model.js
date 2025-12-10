const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'buy', 'sell'], required: true },
  fromCurrency: { type: String, required: true }, //PLN
  toCurrency: { type: String, required: true },   //EUR kupno euro za PLN
  amountFrom: { type: Number, required: true },   //kwota w liczbie waluta
  amountTo: { type: Number, required: true },     //ile waluty otrzymano z toCurrnecy
  rateUsed: { type: Number, required: true },     //kurs użyty do wymiany
  createdAt: { type: Date, default: Date.now },   //data transakcji
});

module.exports = mongoose.model('Transaction', transactionSchema);
