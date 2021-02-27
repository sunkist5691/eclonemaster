const express = require("express");

// router 에 express.Router() 를 통해 router 에 관한 모든 기능을 부여 받는다.
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { upload, remove } = require("../controllers/cloudinary");

// routes
router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
