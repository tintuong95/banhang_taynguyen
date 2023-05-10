'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderitems', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idOrder: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      idProduct: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      quantity: {
        type: new Sequelize.FLOAT(),
        allowNull: false,
      },
      
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderitems')
  },
}
