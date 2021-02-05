const express = require("express");

// router 에 express.Router() 를 통해 router 에 관한 모든 기능을 부여 받는다.
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser); // authCheck 는 user token 을 확인 하는 middleware
router.post("/current-user", authCheck, currentUser); // authCheck 는 user token 을 확인 하는 middleware
router.post("/current-admin", authCheck, adminCheck, currentUser); // 유저 role 이 admin 인지 확인해주는 api

module.exports = router;
