import Product from "../models/product.schema.js";
import ExpressError from "../utils/ExpressError.js";
import data from "../config/data.js";
import Category from  "../models/category.schema.js"
import SubCategory from "../models/subcategory.schema.js"
import mongoose from "mongoose";

import {
    v2 as cloudinary
} from "cloudinary";




const createproduct = async (req, res, next) => {
    const {
        productName,
        price,
        category,
        subCategory,
        description,
        discount,
        finalprice,
        metaltype
    } = req.body;

    if (!productName || !price || !category || !subCategory || !description || !finalprice || !metaltype) {
        return next(new ExpressError(400, "All required fields must be filled"));
    }

    const imageData = req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename
    })) || [];

    const newProduct = new Product({
        productName,
        price,
        category,
        subCategory,
        description,
        discount,
        finalprice,
        metaltype,
        images: imageData,
    });

    await newProduct.save();

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
    });
};



const insertdata = async (req, res) => {
    const ins = await Product.insertMany(data)
    res.status(200).json({
        message: "data save db succssfully"
    })
}

const alldata = async (req, res) => {
    const all = await Product.find();
    res.json(all);

}

const detaildProduct = async (req, res) => {
    const {
        id
    } = req.params


    const detailed = await Product.findById(id)
    res.json(detailed)
}

const findbysubcategory = async (req, res) => {
  const { subcategory } = req.params;

  try {
   
    const foundSubCategory = await SubCategory.findOne({ subcategory });

    if (!foundSubCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

  
    const products = await Product.find({ subCategory: foundSubCategory._id })
      .populate("subCategory", "subcategory") 
      .populate("category", "name");         

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching subcategory data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getallproduct = async (req, res) => {
    const allproduct = await Product.find()
    res.json(allproduct)
}



const editproduct = async (req, res, next) => {
    const {
        id
    } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ExpressError(404, "Product not found"));
    }

    const {
        productName,
        price,
        category,
        subCategory,
        description,
        discount,
        finalprice,
        metaltype,
    } = req.body;


    let updatedImages = product.images;

    if (req.files && req.files.length > 0) {

        for (let img of product.images) {
            await cloudinary.uploader.destroy(img.public_id);
        }


        updatedImages = req.files.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));
    }


    product.productName = productName || product.productName;
    product.price = price || product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.description = description || product.description;
    product.discount = discount || product.discount;
    product.finalprice = finalprice || product.finalprice;
    product.metaltype = metaltype || product.metaltype;
    product.images = updatedImages;

    await product.save();

    res.status(200).json({
        message: "Product updated successfully",
        product,
    });
};

const deleteproduct = async (req, res) => {
    const {
        id
    } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return next(new ExpressError(404, "product not found"))

    }
    for (let img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
        message: "Product Deleted successfully"
    })
}




export {
    insertdata,
    alldata,
    detaildProduct,
    findbysubcategory,
    getallproduct,
    createproduct,
    deleteproduct,
    editproduct
}