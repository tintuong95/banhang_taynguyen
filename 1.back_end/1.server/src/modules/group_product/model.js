const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const GroupProduct = sequelize.define('groupproduct', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  name: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  param: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = GroupProduct