const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const Image = sequelize.define('image', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  idProduct: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },

  image: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = Image