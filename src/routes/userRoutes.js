const express = require("express");
const { get } = require("mongoose");
const userController = require("../controllers/userController");
const userControllerTemp = require("../controllers/userControllerTemp");
const router = express.Router();

router
  .route("/")
  .post(userController.createUser);
router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
router.route("/index").get(userControllerTemp.replaceTemp);

router.route("/form/user").get(userControllerTemp.replaceForm).post(userController.createUser);
router.route("/form/users").get(userControllerTemp.replaceForm)

module.exports = router;
