const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 4050;

app.listen(PORT, () => {
  console.log(`Serveur sur le port ${PORT} `);
});