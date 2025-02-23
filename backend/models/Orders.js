const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: {
    type: [
      {
        order_date: Date,
        items: [
          {
            id: String,
            name: String,
            price: Number,
            qty: Number,
            size: String,
            img: String,
          },
        ],
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("order", OrderSchema);
