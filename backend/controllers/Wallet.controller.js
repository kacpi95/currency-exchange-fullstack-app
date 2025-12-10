const Wallet = require('../models/Wallet.model');
const Transaction = require('../models/Transaction.model');
const auth = require('../utils/authMiddleware');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
