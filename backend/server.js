require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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
