require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST_LOCAL || "localhost",
  DB_USER: process.env.DB_USER_LOCAL || "root",
  DB_PASS: process.env.DB_PASS_LOCAL || "1234567",
  DB_NAME: process.env.DB_NAME_LOCAL || "test",
  DB_PORT: process.env.DB_PORT_LOCAL || 3306,
  DB_CHARSET: process.env.DB_CHARSET || "utf8",
  DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 10,
  DB_CONNECTION_TIMEOUT: process.env.DB_CONNECTION_TIMEOUT || 100000,
};
