'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: new Sequelize.STRING(25),
        allowNull: false,
        unique: true,
      },
      password: {
        type: new Sequelize.STRING(100),
        allowNull: false,
      },
      fullname: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      phone: {
        type: new Sequelize.STRING(100),
       
      },
      address: {
        type: new Sequelize.STRING(50),
      
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  },
}
