const { getAllUser } = require("../controllers/user.controller");
const userDestroyMiddleware = require("../middleware/user/user.destroy.middleware");
const userUpdateMiddleware = require("../middleware/user/user.update.middleware");


const router = require("express").Router();

router.delete("/", userDestroyMiddleware);
router.put("/", userUpdateMiddleware);
router.get("/",  getAllUser)

module.exports = router;
