const Transaction = require('../models/Transaction.model');
const Wallet = require('../models/Wallet.model');
const { fetchNBP } = require('../utils/nbp');

exports.createTransaction = async (req, res) => {
  try {
    const { type, fromCurrency, toCurrency, amountFrom } = req.body;

    if (!type || !fromCurrency || !toCurrency || !amountFrom) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) return req.status(404).json({ message: 'Wallet not found' });

    const rateData = await fetchNBP('A', toCurrency);
    const rateUsed = rateData.mid;
    if (!rateUsed)
      return res.status(400).json({ message: 'Exchange rate not available' });

    const amountTo = (Number(amountFrom) / rateUsed).toFixed(2);

    if (type === 'buy') {
      if (wallet.balance[fromCurrency] < amountFrom)
        return res.status(400).json({ message: 'Insufficient balance' });

      wallet.balance[fromCurrency] -= Number(amountFrom);
      wallet.balance[toCurrency] = (wallet.balance[toCurrency] || 0) + amountTo;
    } else if (type === 'sell') {
      if (wallet.balance[fromCurrency] < amountFrom)
        return res.status(400).json({ message: 'Insufficient balance' });

      wallet.balance[fromCurrency] -= Number(amountFrom);
      wallet.balance[toCurrency] = +(
        wallet.balance[toCurrency] || 0 + amountTo
      ).toFixed(2);
    }

    await wallet.save();

    const transaction = await Transaction.create({
      userId: req.user.userId,
      type,
      fromCurrency,
      toCurrency,
      amountFrom: Number(amountFrom),
      amountTo,
      rateUsed,
    });

    res.json({ message: 'Transaction successful', transaction, wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const transaction = await Transaction.find({ userId: req.user.userId });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
