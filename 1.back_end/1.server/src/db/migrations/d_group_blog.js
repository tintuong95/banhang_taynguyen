'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('groupblogs', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      param: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('groupblogs')
  },
}
