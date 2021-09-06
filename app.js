const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/login.route");
const registerRoute = require("./routes/register.route");
const userRoute = require("./routes/user.route");
const getUserMiddleware = require("./middleware/user/user.get.middleware");
const anthropometriqueRoute = require("./routes/anthropometrique.route");
const patientRoute = require("./routes/patient.route");
const getPatientMiddleware = require("./middleware/patient/patient.getall.middleware");
const deletePatient = require("./middleware/patient/patient.destroy");
const { getAllPatient } = require("./controllers/patient.controller");
const routeReporting = require("./routes/reporting");
const passport = require("passport");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require("./auth/passport");

app.get("/", (req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

// Only for test request
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url + " HTTP/" + req.httpVersion);
  Object.keys(req.headers).forEach(function (field) {
    console.log(field + ": " + req.headers[field]);
  });
  console.dir(req.body);

  next();
});

app.use("/auth", authRoute);
app.use("/register", registerRoute);
app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getUserMiddleware
);
app.use("/users", passport.authenticate("jwt", { session: false }), userRoute);

app.use("/anthropometrique", anthropometriqueRoute);
app.use(
  "/patient",
  passport.authenticate("jwt", { session: false }),
  patientRoute
);


//Route Reporting

app.use("/reporting", routeReporting);

module.exports = app;
