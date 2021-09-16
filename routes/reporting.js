const { getReporting, getReportingByDate, reportingYear } = require("../controllers/reporting.controller");
const reportingValidator = require("../middleware/reporting.validator.middlewre");

const router = require("express").Router();

router.post("/", reportingValidator, getReportingByDate);
router.get("/", getReporting, reportingYear )

module.exports = router;
