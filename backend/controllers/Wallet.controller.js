const Wallet = require('../models/Wallet.model');
const Transaction = require('../models/Transaction.model');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeposit = async (req, res) => {
  try {
    const { amount, currency = 'PLN' } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid amount' });

    const wallet = await Wallet.findOne({ userId: req.user.userId });

    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    if (typeof wallet.balance[currency] === 'undefined')
      wallet.balance[currency] = 0;

    wallet.balance[currency] += Number(amount);
    await wallet.save();

    await Transaction.create({
      userId: req.user.userId,
      type: 'deposit',
      fromCurrency: currency,
      toCurrency: currency,
      amountFrom: Number(amount),
      amountTo: Number(amount),
      rateUsed: 1,
    });

    res.json({ message: 'Deposit wallet', wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
