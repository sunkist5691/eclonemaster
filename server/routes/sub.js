const express = require("express");

// router 에 express.Router() 를 통해 router 에 관한 모든 기능을 부여 받는다.
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { create, read, update, remove, list } = require("../controllers/sub");

// routes
// create sub
router.post("/sub", authCheck, adminCheck, create);

// list all sub (this will be public, which we don't need authCheck or adminCheck)
router.get("/subs", list);

// get single sub information
router.get("/sub/:slug", read);

// update single sub information
router.put("/sub/:slug", authCheck, adminCheck, update);

// delete single sub information
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
