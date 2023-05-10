'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blogs', {
      id: {
        type: new Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      idGroupBlog: {
        type: new Sequelize.STRING(50),
        allowNull: false,
      },
      title: {
        type: new Sequelize.STRING(300),
        allowNull: false,
      },
      image: {
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
      status: {
        type: Sequelize.INTEGER,
      },
      view: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blogs')
  },
}
