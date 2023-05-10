const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const CommentProduct = sequelize.define('commentproduct', {
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
  content: {
    type: new DataTypes.STRING(300),
    allowNull: false,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = CommentProduct