const app = require("./app");

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Serveur sur le port ${PORT} `);
});