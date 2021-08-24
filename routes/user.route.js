const { getAllUser } = require("../controllers/user.controller");
const userDestroyMiddleware = require("../middleware/user/user.destroy.middleware");
const getAllUserMiddleware = require("../middleware/user/user.get.middleware");
const userUpdateMiddleware = require("../middleware/user/user.update.middleware");

const router = require("express").Router();

router.delete("/", userDestroyMiddleware);
router.put("/", userUpdateMiddleware);
router.get("/", getAllUserMiddleware)
//Sécuriter de la route
// router.get("/", getAllUser)
// router.get("/:id",getAllUserMiddleware)

module.exports = router;
