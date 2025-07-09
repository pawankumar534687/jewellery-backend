import ExpressError from "../utils/ExpressError.js";
import Banner from "../models/banner.schema.js";
import {
  v2 as cloudinary
} from "cloudinary";



const createbanner = async (req, res, next) => {
  const {
    title,
    link,
    isActive,
    position
  } = req.body;

  if (!title || !link || !position || typeof isActive === "undefined") {
    return next(new ExpressError(400, "All fields are required"));
  }

  const file = req.file;
  if (!file) {
    return next(new ExpressError(400, "Image file is required"));
  }

  const newbanner = new Banner({
    title,
    link,
    isActive: isActive === "true" || isActive === true,
    position,
    image: {
      url: file.path,
      public_id: file.filename,
    },
  });

  await newbanner.save();
  res.status(200).json({
    message: "Banner created successfully"
  });
};

const getallbanner = async (req, res) => {
  const banner = await Banner.find()
  res.json(banner)
}


const deletebanner = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({
        message: "Banner not found"
      });
    }

    if (banner.image?.public_id) {
      await cloudinary.uploader.destroy(banner.image.public_id);
    }

    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      message: "Banner deleted successfully"
    });
  } catch (err) {
    console.error("❌ Error deleting banner:", err);
    res.status(500).json({
      message: "Server error while deleting banner"
    });
  }
};



const getbannerbyid = async (req, res) => {
  const {
    id
  } = req.params
  const banner = await Banner.findById(id)
  res.json({
    banner
  })
}


const updateBanner = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const {
      title,
      link,
      position,
      isActive
    } = req.body;

    if (!title || !link || !position) {
      return next(new ExpressError(400, "All fields are required"));
    }

    const banner = await Banner.findById(id);
    if (!banner) {
      return next(new ExpressError(404, "Banner not found"));
    }

    banner.title = title;
    banner.link = link;
    banner.position = position;
    banner.isActive = isActive === "true" || isActive === true;


    if (req.file) {
      if (banner.image?.public_id) {
        await cloudinary.uploader.destroy(banner.image.public_id);
      }

      banner.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await banner.save();

    res.status(200).json({
      message: "Banner updated successfully"
    });
  } catch (error) {
    console.error("❌ Error updating banner:", error);
    next(new ExpressError(500, "Server error while updating banner"));
  }
};





export {
  createbanner,
  getallbanner,
  deletebanner,
  getbannerbyid,
  updateBanner
};