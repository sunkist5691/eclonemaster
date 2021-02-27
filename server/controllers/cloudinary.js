const cloudinary = require("cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`, // id in string format
    resource_type: "auto", // jpeg, png config automatically
  });
  res.json({
    public_id: result.public_id, // public id will be the id of image
    url: result.secure_url, // cloudinary send back to client with image URL
  });
};

// delete image in cloudinary as well as server
exports.remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("successfully deleted the image in cloudinary");
  });
};
