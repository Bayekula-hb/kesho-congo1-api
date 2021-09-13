const {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  resetPassword
} = require("../controllers/user.controller");

const userDestroyMiddleware = require("../middleware/user/user.destroy.middleware");
const getUserMiddleware = require("../middleware/user/user.get.middleware");
const userRegisterMiddleware = require("../middleware/user/user.register.middleware");
const userUpdateMiddleware = require("../middleware/user/user.update.middleware");
const loginMiddleware = require("../middleware/login.middleware");

const router = require("express").Router();

router.delete("/", userDestroyMiddleware, deleteUser);
router.put("/", userUpdateMiddleware, updateUser);
router.post("/register", userRegisterMiddleware, addUser);
router.post("/reset",  resetPassword);
router.get("/all", getAllUser);
router.get("/", getUserMiddleware, getUserById);

module.exports = router;
