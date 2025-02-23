const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Save or update order
router.post("/saveOrder", async (req, res) => {
  try {
    const { email, order_data } = req.body;
    if (!email || !order_data) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Add timestamp to order
    const orderWithDate = { order_date: new Date(), items: order_data };

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({ email, order_data: [orderWithDate] });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: orderWithDate } }
      );
    }

    return res.json({ success: true, message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

// Fetch user orders
router.post("/myOrderData", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const orders = await Order.findOne({ email });
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    return res.json({ success: true, orderData: orders.order_data });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
