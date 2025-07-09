import mongoose from "mongoose"


const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,

  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true
  },
  description: {
    type: String,
    required: true,

  },
  images: {
    type: [{
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    }],
    required: true,
    validate: {
      validator: (val) => val.length > 0,
      message: "At least one image is required",
    }
  },

  discount: {
    type: Number,
    default: 0,

  },
  finalprice: {
    required: true,
    type: String,
  },
  metaltype: {
    type: String,
    required: true,
  }


}, {
  timestamps: true
})

const Product = mongoose.model("CreateProduct", ProductSchema)

export default Product;