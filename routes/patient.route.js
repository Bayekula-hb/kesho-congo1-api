const { getAllPatient } = require("../controllers/patient.controller");
const patientDestroyMiddleware = require("../middleware/patient/patient.destroy");
const getPatientMiddleware = require("../middleware/patient/patient.getall.middleware");

const router = require("express").Router();

router.get("/", getPatientMiddleware);
router.delete("/", patientDestroyMiddleware)

module.exports = router;