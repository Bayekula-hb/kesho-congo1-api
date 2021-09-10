const { getAllPatient, addPatient, getPatient, deletePatient, updatePatient, detailPatient } = require("../controllers/patient.controller");
const patientDestroyMiddleware = require("../middleware/patient/patient.destroy");
const getPatientMiddleware = require("../middleware/patient/patient.getall.middleware");
const updatePatientMiddleware = require("../middleware/patient/patient.update.middleware");
const patientValidatorAdd = require("../middleware/patient/patient.validation.middleware");

const router = require("express").Router();

router.get("/", getPatientMiddleware, getPatient);
router.get("/all", getAllPatient);
router.get("/detail", patientDestroyMiddleware, detailPatient)
router.delete("/", patientDestroyMiddleware, deletePatient);
router.put("/", updatePatientMiddleware, updatePatient);
router.post("/", patientValidatorAdd ,addPatient)

module.exports = router;
