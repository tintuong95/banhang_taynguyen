const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../../configs/sequelize.js')
const { v4 } = require('uuid')

const User = sequelize.define('user', {
    id: {
        type: new DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: () => v4(),
    },
    username: {
        type: new DataTypes.STRING(25),
        allowNull: false,
        unique: true,
    },
    password: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    fullname: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    phone: {
        type: new DataTypes.STRING(100),
     
    },
    address: {
        type: new DataTypes.STRING(50),
       
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    type:{
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
})

module.exports = User