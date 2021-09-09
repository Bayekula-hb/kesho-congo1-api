const { getReporting, getReportingByDate } = require("../controllers/reporting.controller");
const reportingValidator = require("../middleware/reporting.validator.middlewre");

const router = require("express").Router();

router.post("/", reportingValidator, getReportingByDate);
router.get("/", getReporting )

module.exports = router;
