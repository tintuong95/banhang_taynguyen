'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('commentblogs', {
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
      idBlog: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      content: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('commentblogs')
  },
}
