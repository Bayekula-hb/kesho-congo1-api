const { Sequelize } = require("sequelize");

// Configuration de la base de donnée
const db = new Sequelize(
    "kesho",
   "root",
    "",
    {
      host: "localhost",
      dialect: "mysql",
    }
  );

  // Cette synthaxe nous permet a executer la migration des tables automatiquement vers la base de donnée
  // db.sync();
  
  (async () => {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();
  
  module.exports = db;