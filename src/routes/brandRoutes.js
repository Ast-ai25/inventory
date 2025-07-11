const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const { verifyToken: protect, checkPermission } = require("../middleware/authMiddleware");

// Protect all brand routes and enforce permissions
router.use(protect);

router.route("/")
  .post(checkPermission("create_brand"), brandController.createBrand)
  .get(checkPermission("read_brand"), brandController.getAllBrands);

router.route("/:id")
  .get(checkPermission("read_brand"), brandController.getBrandById)
  .put(checkPermission("update_brand"), brandController.updateBrand)
  .delete(checkPermission("delete_brand"), brandController.deleteBrand);

module.exports = router;
