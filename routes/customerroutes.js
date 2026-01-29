const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const customer = require("../models/customerModel");

/* =======================
   EMAIL CONFIG
======================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // set in .env
    pass: process.env.EMAIL_PASS  // set in .env
  }
});

/* =======================
   GET ALL CUSTOMERS
======================= */
router.get("/", async (req, res) => {
  try {
    const allcust = await customer.find();
    res.status(200).json(allcust);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =======================
   REGISTER CUSTOMER
======================= */
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Check existing customer
    const existcust = await customer.findOne({ email });
    if (existcust) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Save customer
    const newcust = new customer(req.body);
    const savedCustomer = await newcust.save();

    // RESPOND IMMEDIATELY (prevents timeout)
    res.status(201).json({
      message: "Registration successful",
      customerId: savedCustomer._id
    });

    // SEND EMAIL ASYNC (non-blocking)
    transporter.sendMail({
      from: '"Cake Shop" <' + process.env.EMAIL_USER + '>',
      to: email,
      subject: "Registration Confirmation",
      text:
        "Thank you for joining Cake Shop!\n\n" +
        "We're excited to have you on board.\n\n" +
        "Best regards,\nThe Cake Shop Team"
    }).catch(err => console.error("Email error:", err));

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* =======================
   DELETE CUSTOMER
======================= */
router.delete("/:id", async (req, res) => {
  try {
    const result = await customer.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =======================
   UPDATE CUSTOMER
======================= */
router.put("/:id", async (req, res) => {
  try {
    const upd = await customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!upd) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(upd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
