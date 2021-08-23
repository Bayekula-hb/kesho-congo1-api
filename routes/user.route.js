const userDestroyMiddleware = require("../middleware/user/user.destroy.middleware");
const userUpdateMiddleware = require("../middleware/user/user.update.middleware");

const router = require("express").Router();

router.delete("/", userDestroyMiddleware);
router.put("/", userUpdateMiddleware);


module.exports = router;
