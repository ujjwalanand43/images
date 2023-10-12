const express = require("express");
const router = express.Router();
const ImagesModel = require("../models/images");
const cloudinary = require('cloudinary');

router.post("/images", async (req, res) => {
  let imagesArray = [];

  

    // Handle the case where req.files.media is a single element (not an array)
    console.log("UPLOAD START single...");
    let result = await cloudinary.v2.uploader.upload(
      req.files.media_url.tempFilePath,
      {
        folder: "blog_users/post",
      }
    );

    imagesArray.push({
      id: result.public_id,
      secure_url: result.secure_url,
    });
 
  req.body.media_url = imagesArray;
  const postMedia = await ImagesModel.create(req.body);
  res.status(201).json({
    success: true,
    postMedia,
  });
});
router.get("/images", async (req, res) => {
  const Media = await ImagesModel.find({});
  res.status(200).json({
    success: true,
    Media,
  });
});

module.exports = router;
