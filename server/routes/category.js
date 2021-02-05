const express = require("express");

// router 에 express.Router() 를 통해 router 에 관한 모든 기능을 부여 받는다.
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

// routes
// create category
router.post("/category", authCheck, adminCheck, create);

// list all category (this will be public, which we don't need authCheck or adminCheck)
router.get("/categories", list);

// get single category information
router.get("/category/:slug", read);

// update single category information
router.put("/category/:slug", authCheck, adminCheck, update);

// delete single category information
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
