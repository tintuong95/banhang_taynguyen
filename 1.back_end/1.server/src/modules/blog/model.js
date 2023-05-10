const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const Blog = sequelize.define('blog', {
  id: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => v4(),
  },
  idGroupBlog: {
    type: new DataTypes.STRING(50),
    allowNull: false,
  },
  title: {
    type: new DataTypes.STRING(300),
    allowNull: false,
  },
  image: {
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
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  view: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

module.exports = Blog
