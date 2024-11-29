const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});
app.post("/payment/create", async (req, res) => {
  const totalAmount = req.query.total;
  if (totalAmount > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });
    res.status(201).json({
      clientScerete: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({ message: "Total amount mus be greater than zero!" });
  }
});
exports.api = onRequest(app);

//  exports.api =onRequest(app);
