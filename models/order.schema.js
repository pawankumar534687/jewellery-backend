import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   
  },
  customer: {

    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true
    },
  },

  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    productName: String,
    quantity: Number,
    price: Number,
    image: String,
  }, ],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryCharge: {
    type: Number,
    default: 0
  },
  handlingCharge: {
    type: Number,
    default: 0
  },


  coupon: {
    code: {
      type: String
    },
    discount: {
      type: Number,
      default: 0
    }
  },

  finalAmount: {
    type: Number,
    required: true
  },
  Orderstatus: {
    type: String,
    default: "placed"
  },
  orderId: {
    type: String,
    unique: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",

  }

}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;