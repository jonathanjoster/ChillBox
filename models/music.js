'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Music = loader.database.define(
  'musics',
  {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    artist: {
      type: Sequelize.STRING,
      allowNull: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    attribute: {
      type: Sequelize.STRING,
      allowNull: true
    },
    note: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Music;