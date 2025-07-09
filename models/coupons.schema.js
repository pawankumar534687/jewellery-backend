import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title:{
    type: String,
    required: true,
  },
  discountValue: {
    type: Number,
    required: true
  },
 
  maxOrderAmount: {
    type: Number,
    default: 0
  },
  
  minOrderAmount: {
    type: Number,
    default: 0
  },
  active: {
  type: Boolean,
  default: true,
}

 
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
