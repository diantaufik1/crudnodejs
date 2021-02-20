const sequelize = require("sequelize");

const db = new sequelize("db_crudnodejs","root","", {
    dialect: "mysql"
});

db.sync({});

module.exports = db;