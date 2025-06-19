import mongoose from "mongoose"


const ProductSchema = mongoose.Schema({
  productName: String,
  price: String,
  category: String,
  subCategory: String,
  unit: String,
  customerCareDetails: String,
  description: String,
  images: Array,

}, {
  timestamps: true
})

const Product = mongoose.model("CreateProduct", ProductSchema)

export default Product;