const admin = require("../firebase/firebase.js");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    // user 가 로그인할때 backend 에 보낸 token 을 backend 에서 전달받고, 그리고 나서 firebase 에 방금 받은 token 을 verfity 하는 과정을 거친다
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);

    // req.user 는 지금 firebaseUser 에서 받은 user info 를 request object 안에 user 라는 key 에 value 로 저장을 하고,
    // 이 저장된 정보를 next() 를 실행하여 다음 middleware 에게 보낸다.
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({ err: "Invalid or expired token" });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    // code 403 is unauthorized response code.
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
