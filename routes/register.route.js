const registerMiddleware = require("../middleware/register.middleware");

const router = require("express").Router();

router.use("/", registerMiddleware);
// router.post("/", (req, res, next) => {
//   res.status(200).json({ message: `${req}` });
// });

module.exports = router;
