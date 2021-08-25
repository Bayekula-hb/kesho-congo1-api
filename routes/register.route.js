
const registerMiddleware = require("../middleware/register.middleware");

const router = require("express").Router();

router.use("/", registerMiddleware);


module.exports = router;