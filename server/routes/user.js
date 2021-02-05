const express = require("express");

// router 에 express.Router() 를 통해 router 에 관한 모든 기능을 부여 받는다.
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "Hello friend, you just hit 'user' API endpoint !!",
  });
});

module.exports = router;
