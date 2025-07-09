import Category from "../models/category.schema.js";
import ExpressError from "../utils/ExpressError.js"

const createcategory = async (req, res, next) => {
  const {
    name
  } = req.body;
 

  if (!name) {
    return next(new ExpressError(400, "Category is required"));
  }

  const exists = await Category.findOne({
    name
  });
  if (exists) {
    return next(new ExpressError(409, "Category already exists"));
  }

  const cate = new Category({
    name
  });
  await cate.save();


  res.status(201).json({
    message: "Category created successfully"
  });
};


const getcategory = async (req, res) => {
  const category = await Category.find();
  res.json(category)
}

const deletecategory = async (req, res) => {
  const {
    id
  } = req.params
  const deletedcategory = await Category.findByIdAndDelete(id)
  res.status(200).json({
    message: "Category deleted successfully"
  })
}


const getcategorybyid = async (req, res) => {
  const {
    id
  } = req.params
  const category = await Category.findById(id)
  res.json(category)

}

const editcategory = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name
  } = req.body;
  const updated = await Category.findByIdAndUpdate(id, {
    name
  }, {
    new: true,
    runValidators: true,
  })
  if (!updated) {
    return next(new ExpressError(404, "Category not found"))

  }

  res.status(200).json({
    message: "Category update successfully"
  })
}





export {
  createcategory,
  getcategory,
  deletecategory,
  getcategorybyid,
  editcategory
}