const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const OrderItem = sequelize.define('orderitem', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  idOrder: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  idProduct: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  quantity: {
    type: new DataTypes.FLOAT(),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = OrderItem