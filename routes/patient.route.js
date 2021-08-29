const { getAllPatient } = require("../controllers/patient.controller");
const getPatientMiddleware = require("../middleware/patient/patient.getall.middleware");

const router = require("express").Router();
// router.post("/", anthropometriqueRegisterMiddleware);
router.get("/", getPatientMiddleware);

module.exports = router;