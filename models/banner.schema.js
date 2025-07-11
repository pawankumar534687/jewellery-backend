import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: String,
    image:{
        url: String,
        public_id: String,
    },
    link: String,
    isActive:{
        type: Boolean,

       
    },
    position:{
        type: String,
        required: true,
    }
})

const Banner = mongoose.model("Banner", bannerSchema)

export default Banner;