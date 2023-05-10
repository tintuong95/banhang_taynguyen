const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const Product = sequelize.define('product', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  idGroupProduct: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  unit: {
    type: new DataTypes.STRING(20),
    allowNull: false,
  },
  title: {
    type: new DataTypes.STRING(300),
    allowNull: false,
  },
  param: {
    type: new DataTypes.STRING(300),
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING(300),
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  image: {
    type: new DataTypes.STRING(300),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  sale: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  view: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
   amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = Product
