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

exports.listAll = async (req, res) => {
  // fetch all the products that is listed
  // populate method 는 category 의 information 또한 같이 보내준다.
  // let products = await Product.find({}).populate('category');
  let products = await Product.find({})
    .limit(parseInt(req.params.count)) // 모든 파일이 아니라 count 갯수에 맞게 데이터를 가져온다
    .populate("category")
    .populate("subs") // product model 에 ref: 된 파일들은 populate 을 해야 거기에 연결된 데이터까지 다 보내준다
    .sort([["createAt", "desc"]]) // sort in createAt with descending order
    .exec();
  res.json(products);
};
