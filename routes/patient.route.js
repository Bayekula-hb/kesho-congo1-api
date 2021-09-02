const { getAllPatient } = require("../controllers/patient.controller");
const patientDestroyMiddleware = require("../middleware/patient/patient.destroy");
const getPatientMiddleware = require("../middleware/patient/patient.getall.middleware");
const updatePatientMiddleware = require("../middleware/patient/patient.update.middleware");

const router = require("express").Router();

router.get("/", getPatientMiddleware);
router.delete("/", patientDestroyMiddleware);
router.put("/", updatePatientMiddleware);

module.exports = router;
