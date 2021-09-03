const { getReporting } = require("../controllers/reporting.controller");

const router = require("express").Router();


router.get("/", getReporting);


module.exports = router;