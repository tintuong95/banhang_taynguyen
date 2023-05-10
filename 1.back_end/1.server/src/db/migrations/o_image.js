'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
    
      },
      idProduct: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },

      image: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images')
  },
}
