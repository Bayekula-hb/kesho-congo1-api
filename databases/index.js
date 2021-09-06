const { Sequelize } = require("sequelize");

// Configuration de la base de donnée
const db = new Sequelize(
  "bsouruivlyra7oak70av",
  "ugkdeyce9bmzpgij",
  "SvRh1B1Z9eZqQrzZS59a",
  {
    host: "bsouruivlyra7oak70av-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);
// Cette synthaxe nous permet a executer la migration des tables automatiquement vers la base de donnée
db.sync();

(async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
