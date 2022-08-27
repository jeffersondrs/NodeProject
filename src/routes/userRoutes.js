const express = require("express");
const userController = require("../controllers/userController");
const userControllerTemp = require('../controllers/userControllerTemp')

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
router.route('/index').get(userControllerTemp.replaceTemp);

module.exports = router;
