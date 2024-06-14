const express = require("express");
const router = express.Router();

const {
  userprofile,
  allposts,
  editpost,
  deletepost,
  addpost,
  viewpost,
} = require("../controllers/profileController");

router.post("/", userprofile);
router.post("/allpost", allposts);
router.post("/editpost", editpost);
router.post("/deletepost", deletepost);
router.post("/addpost", addpost);
router.post("/viewpost", viewpost);

module.exports = router;
