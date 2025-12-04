require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Wallet = require("./models/Wallet");

const app = express();
app.use(cors());
app.use(express.json());

router.post("/register", async (req, res) => {
	try {
		const { email, password, name } = req.body;

		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ message: "Email already used" });

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			passwordHash,
			name,
		});
		await Wallet.create({
			userId: user._id,
			balance: { PLN: 0, USD: 0, EUR: 0 },
		});

		return res.json({ message: "User registered successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("MongoDB Atlas connected"))
	.catch((err) => console.log(err));

const db = mongoose.connection;

db.once("open", () => {
	console.log("Connected to the database");
});
db.on("error", (err) => console.log("Error " + err));

const server = app.listen(process.env.PORT || 8000, () => {
	console.log("Server is running on port: 8000");
});
