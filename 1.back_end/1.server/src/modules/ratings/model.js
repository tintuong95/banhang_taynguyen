const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const Ratings = sequelize.define('ratings', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  idUser: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  idProduct: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },

  rate: {
    type: DataTypes.INTEGER(),
    allowNull: false,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = Ratings