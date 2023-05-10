'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'admins',
      [
        {
          id: 1,
          username: 'admin@example.com',
          password: '$2b$11$YU8h0xSGzQpfrQ8Uh8fhUu8NxPywDiMcv7Sv8Z22PPdxwF1efY7kW', //admin123
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {})
  },
}
