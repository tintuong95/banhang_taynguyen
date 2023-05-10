'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idGroupProduct: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      unit: {
        type: new Sequelize.STRING(20),
        allowNull: false,
      },
      title: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },
      param: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },
      description: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      sale: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      length: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      view: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products')
  },
}
