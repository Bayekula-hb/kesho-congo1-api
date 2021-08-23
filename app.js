const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./utils/Dbconnect");
const authRoute = require("./routes/login.route");
const registerRoute = require("./routes/register.route");

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

app.use("/auth", authRoute);
app.use("/register", registerRoute);

module.exports = app;
