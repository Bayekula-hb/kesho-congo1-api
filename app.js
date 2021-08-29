const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./databases/index");
const authRoute = require("./routes/login.route");
const registerRoute = require("./routes/register.route");
const userRoute = require("./routes/user.route");
const getUserMiddleware = require("./middleware/user/user.get.middleware");
const anthropometriqueRoute = require("./routes/anthropometrique.route");


app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

app.use("/auth", authRoute);
app.use("/register", registerRoute);
app.get('/user', getUserMiddleware);
app.use("/users", userRoute);
app.use("/anthropometrique", anthropometriqueRoute)


module.exports = app;
