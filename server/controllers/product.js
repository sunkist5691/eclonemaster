const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    // req.body 에 slug property 생성
    req.body.slug = slugify(req.body.title);

    // .save() 는 database 에 저장하는 역할을 한다
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log("CREATE PRODUCT ERROR ------>", err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.read = async (req, res) => {
  // fetch all the products that is listed
  // populate method 는 category 의 information 또한 같이 보내준다.
  // let products = await Product.find({}).populate('category');
  let products = await Product.find({});
  res.json(products);
};
