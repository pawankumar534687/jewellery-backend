import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subcategory: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  image: {
    url: String,
    public_id: String,
  }
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;