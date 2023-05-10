'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      code: {
        type: new Sequelize.STRING(10),
        allowNull: false,

        unique: true,
      },
      idUser: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      shipping: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      promo: {
        type: new Sequelize.STRING(100),
        allowNull: true,
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      grandtotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      province: {
        type: new Sequelize.STRING(100),
        allowNull: false,
      },
      district: {
        type: new Sequelize.STRING(100),
        allowNull: false,
      },

      commune: {
        type: new Sequelize.STRING(100),
        allowNull: false,
      },
      name: {
        type: new Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: new Sequelize.STRING(100),
        allowNull: false,
      },
      address: {
        type: new Sequelize.STRING(500),
        allowNull: false,
      },
      payment: {
        type:  Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders')
  },
}
