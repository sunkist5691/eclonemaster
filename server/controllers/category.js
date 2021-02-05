const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    // 이름을 req.body 에서 destruct 를 하고,
    // 새로운 category 를 생성하여 res.json() 형태로 보낸다.

    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Failed to create a new category");
  }
};

exports.list = async (req, res) => {
  // send with sorted with latest data using 'createdAt: -1'
  // 만약 find() 에 특정 이름이나 object 를 전달하지 않을 경우,
  // category 에 있는 모든 데이터를 array 에 묶어서 불러온다
  // postman 에 GET method 로 localhost:8000/categories 를 해보면 모든 데이터를 가져온다.
  res.json(await Category.find().sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  // 특정 아이템 하나만 찾고 싶을 경우, findOne 메서드를 활용
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  const { name } = req.body;

  // 일단 findOneAndUpdate 에 첫번째 인자로 slug 로 특정 category 를 찾아내고,
  // 두번째 인자로 req.body 에서 받은 name 을 업데이트하고,
  // slug 를 slugify 로 다시 새로 업데이트 한다
  // 세번째 인자로 전달된 new: true 는 방금 새롭게 업데이트 된 새로운 정보를 res.json 에 보낸다

  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true } // <-- 이거 정말 중요함, 왜냐하면 post man 으로 확인할때 업데이트가 되었는지 안되었는지 알수 있음
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Failed to update category");
  }
};

exports.remove = async (req, res) => {
  try {
    const deletion = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletion);
  } catch (err) {
    res.status(400).send("Failed to delete category");
  }
};
