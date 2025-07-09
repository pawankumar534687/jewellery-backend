import ExpressError from "../utils/ExpressError.js";
import SubCategory from "../models/subcategory.schema.js"
import {
    v2 as cloudinary
} from "cloudinary";


const createsubcategory = async (req, res, next) => {

    const {
        category,
        subcategory
    } = req.body



    if (!req.file) {
        return next(new ExpressError(400, "Image is required"));
    }
    if (!category || !subcategory) {
        return next(new ExpressError(400, "all feild are requires"))
    }

    const fileUrl = req.file.path
    const publicid = req.file.filename

    const newSubCategory = new SubCategory({

        category,
        subcategory,
        image: {
            url: fileUrl,
            public_id: publicid,
        }

    })

    await newSubCategory.save();

    res.status(200).json({
        message: "created subcategory sucssfully"
    })

}


const getsubcategory = async (req, res) => {
    const subcategory = await SubCategory.find().populate("category", "name")
    res.json(subcategory)
}


const getformsubcategory = async (req, res) => {
    const {
        id
    } = req.params
    const findsubcategory = await SubCategory.findById(id).populate("category", "name");
    if (!findsubcategory) {
        return next(new ExpressError(404, "Sub Category not found"))
    }
    res.json(findsubcategory)
}

const editsubcategory = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        category,
        subcategory
    } = req.body;

    const sub = await SubCategory.findById(id);
    if (!sub) {
        return next(new ExpressError(404, "SubCategory not found"));
    }


    if (req.file && sub.image?.public_id) {
        await cloudinary.uploader.destroy(sub.image.public_id);
    }


    if (req.file) {
        sub.image = {
            url: req.file.path,
            public_id: req.file.filename,
        };
    };

    
    sub.category = category;
    sub.subcategory = subcategory;

    await sub.save();

    res.status(200).json({
        message: "SubCategory updated successfully"
    });

}

const deletesubcategory = async (req, res, next) => {
    const {
        id
    } = req.params
    const sub = await SubCategory.findById(id)

    if (!sub) {
        return next(new ExpressError(404, "SubCategory not found"))
    }
  
    if (sub.image?.public_id) {
        await cloudinary.uploader.destroy(sub.image.public_id);
    }
    await SubCategory.findByIdAndDelete(id);

    res.status(200).json({
        message: "SubCategory delete successfully"
    })
}




export {
    createsubcategory,
    getsubcategory,
    getformsubcategory,
    deletesubcategory,
    editsubcategory
}