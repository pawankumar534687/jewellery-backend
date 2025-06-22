import Product from "../models/product.schema.js";
// import ExpressError from "../utils/expressError.js";
import data from "../config/data.js";


// const createproduct = async (req, res, next) => {


//     const {
//         title,
//         description,
//         price
//     } = req.body;
// console.log("body", req.body)
// console.log("FILES:", req.files);


//     const imgurls = req.files.map((file) => file.path);

//    if (!title || !description || !price || !req.files || !req.files.length) {
//   return next(new ExpressError(404, "All fields are required"));
// }


//     const newProduct = new CreateProduct({
//         title,
//         description,
//         price: Number(price),
//         images: imgurls
//     })

//     await newProduct.save();

//     res.status(201).json({
//         message: "product created"
//     })
// }

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

const findbycategory = async (req, res) => {
    const {
        category
    } = req.params

    const data = await Product.find({
        category
    })
    res.json(data)

}




export {
    insertdata,
    alldata,
    detaildProduct,
    findbycategory
}