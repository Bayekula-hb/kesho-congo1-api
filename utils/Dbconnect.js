const Sequelize = require("sequelize");

// const db = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD,{
//     host:process.env.HOST,
//     dialect:"mysql"
// })
const db = new Sequelize("kesho", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = db;
