const express = require("express");
const router = express.Router();
const {
  homeRoutes,
  aboutRoutes,
  contactRoutes,
  servicesRoutes,
} = require("../controllers/homeController");
router.get("/", homeRoutes);
router.get("/about", aboutRoutes);
router.get("/contact", contactRoutes);
router.get("/services", servicesRoutes);

module.exports = router;
