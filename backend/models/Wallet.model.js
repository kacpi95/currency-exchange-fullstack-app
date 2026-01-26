const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	balance: {
		PLN: { type: Number, default: 0 },
		USD: { type: Number, default: 0 },
		EUR: { type: Number, default: 0 },
	},
});

module.exports = mongoose.model("Wallet", walletSchema);
