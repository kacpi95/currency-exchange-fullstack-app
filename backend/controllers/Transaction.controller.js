const Transaction = require('../models/Transaction.model');
const Wallet = require('../models/Wallet.model');
const { fetchNBP } = require('../utils/nbp');

const round2 = (value) =>
  Math.round((Number(value) + Number.EPSILON) * 100) / 100;

const getMidRatePLNPerUnit = async (currency) => {
  if (!currency) return null;
  if (currency === 'PLN') return 1;
  const rateData = await fetchNBP('A', currency);
  return rateData?.mid ?? null;
};

exports.createTransaction = async (req, res) => {
  try {
    const { type, fromCurrency, toCurrency, amountFrom } = req.body;

    if (!type || !fromCurrency || !toCurrency || !amountFrom) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    const parsedAmountFrom = Number(amountFrom);
    if (!Number.isFinite(parsedAmountFrom) || parsedAmountFrom <= 0) {
      return res
        .status(400)
        .json({ message: 'amountFrom must be a positive number' });
    }

    const fromMid = await getMidRatePLNPerUnit(fromCurrency);
    const toMid = await getMidRatePLNPerUnit(toCurrency);
    if (!fromMid || !toMid) {
      return res.status(400).json({ message: 'Exchange rate not available' });
    }

    const amountPln = parsedAmountFrom * fromMid;
    const amountTo = round2(amountPln / toMid);
    const rateUsed = round2(fromMid / toMid);

    if (type !== 'buy' && type !== 'sell') {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    const currentFromBalance = Number(wallet.balance[fromCurrency] || 0);
    const currentToBalance = Number(wallet.balance[toCurrency] || 0);

    if (currentFromBalance < parsedAmountFrom) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    wallet.balance[fromCurrency] = round2(
      currentFromBalance - parsedAmountFrom,
    );
    wallet.balance[toCurrency] = round2(currentToBalance + amountTo);

    await wallet.save();

    const transaction = await Transaction.create({
      userId: req.user.userId,
      type,
      fromCurrency,
      toCurrency,
      amountFrom: parsedAmountFrom,
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
    const transaction = await Transaction.findOne({
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
