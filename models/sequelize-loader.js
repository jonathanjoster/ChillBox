'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/cb'
);

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};