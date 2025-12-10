const Transaction = require('../models/Transaction.model');
const Wallet = require('../models/Wallet.model');
const { fetchNBP } = require('../utils/nbp');

exports.createTransaction = async (req, res) => {
  try {
    const { type, formCurrency, toCurrency, amountFrom } = req.body;

    if (!type || !formCurrency || !toCurrency || !amountFrom) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const wallet = await Wallet.findOne({ userId: req.body.userId });
    if (!wallet) return req.status(404).json({ message: 'Wallet not found' });

    const rateData = await fetchNBP('A', toCurrency);
    const rateUsed = rateData.mid;
    if (!rateUsed)
      return res.status(400).json({ message: 'Exchange rate not available' });

    const amountTo = Number(amountFrom) / rateUsed;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
