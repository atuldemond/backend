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

router.get("/", userprofile);
router.post("/allpost", allposts);
router.post("/editpost", editpost);
router.post("/deletepost", deletepost);
router.post("/addpost/:username", addpost);

router.get("/viewpost", viewpost);

module.exports = router;
