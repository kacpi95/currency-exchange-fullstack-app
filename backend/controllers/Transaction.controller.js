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

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
