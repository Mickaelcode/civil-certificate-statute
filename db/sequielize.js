const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("civilacte", "postgres", "Mika", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize, DataTypes };
