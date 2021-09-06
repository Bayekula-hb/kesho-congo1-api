const anthropometriqueGetByIdMiddleware = require("../middleware/anthropometrique/anthropometrique.get.middleware");
const anthropometriqueRegisterMiddleware = require("../middleware/anthropometrique/anthropometrique.register.middleware");

const router = require("express").Router();

router.post("/", anthropometriqueRegisterMiddleware);
router.get("/", anthropometriqueGetByIdMiddleware);

module.exports = router;