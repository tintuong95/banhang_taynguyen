'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idUser: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      idProduct: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },

      rate: {
        type: Sequelize.INTEGER(),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ratings')
  },
}
