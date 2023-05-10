const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const CartItem = sequelize.define('cartitem', {
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
  quantity: {
    type: new DataTypes.FLOAT(),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = CartItem