import Product from "../models/product.schema.js";

const search = async (req, res) => {
    const searchTerm = (req.query.q || "").trim();

    const products = await Product.find({
        productName: {
            $regex: searchTerm,
            $options: "i"
        },
    });

    res.json(products);
};

export {
    search
};
