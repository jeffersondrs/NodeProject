const express = require("express");
const userController = require("../controllers/userController");
const userControllerTemplate = require("../controllers/userControllerTemp");
const router = express.Router();

// router
//   .route("/")
//   .post(userController.createUser);
router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
router.route("/index").get(userControllerTemplate.replaceTemp);
router.route("/form/users").get(userControllerTemplate.replaceForm)
router.route("/usuario").post(userController.createUser)
router.route('/post/user').get(userControllerTemplate.replaceUser)

module.exports = router;
 