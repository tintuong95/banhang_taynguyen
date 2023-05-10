const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')
const makeCode  = require('../../utils/makecode.js')

const Order = sequelize.define('order', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  code: {
    type: new DataTypes.STRING(10),
    allowNull: false,

    unique: true,
    defaultValue: () => makeCode(6),
  },
  idUser: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  shipping: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  promo: {
    type: new DataTypes.STRING(100),
    allowNull: true,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  grandtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  province: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  district: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },

  commune: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  name: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  address: {
    type: new DataTypes.STRING(500),
    allowNull: false,
  },
   payment: {
    type:  DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = Order