// import User schema model
const User = require("../models/user");

// exporting createOrUpdateUser as a variable
exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  // "findOndAndUpdate" function 의 first argument 는  email 로 user 정보를 mongoose db 에서 찾는다
  // if the user email exists in database, then we update "name and picture"
  // {new: true} 가 하는 역할은, 방금전 name 과 picture 를 업데이트 한 user 의 정보를 반환하게 한다.
  // 만약, {new: true} 를 넣지 않으면 update 가 되어도, update 되기전의 user 정보를 반환하게 된다.
  const user = await User.findOneAndUpdate(
    { email }, // same as "email: email"
    { name: email.split("@")[0], picture },
    { new: true }
  );

  // 만약 user 가 존재한다면, update 을 하고,
  // 그렇지 않다면, 그 user 를 새로 database 에 새로 등록한다
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    // .save() 의 역할은 새로운 User 를 생성하여 mongoose db 에 저장한다
    console.log("NEW USER CREATED", newUser);
    res.json(newUser);
  }
  // if you use res.status().send, it send a html/text format to client
  // if you use res.status().json, it send a JSON format to client
};

exports.currentUser = (req, res) => {
  // .exec() is execute function
  User.findOne({ email: req.user.email }).exec((err, user) => {
    // if User associated with email cannot find in database,
    // then, throw error otherwise, return user information
    if (err) throw new Error(err);
    res.json(user);
  });
};
