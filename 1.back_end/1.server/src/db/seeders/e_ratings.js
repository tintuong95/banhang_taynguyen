'use strict'

const { faker } = require('@faker-js/faker')

let ratings = []

for (var i = 0; i < 5000; i++) {
  ratings.push({
    id: faker.datatype.uuid(),
    idUser: faker.datatype.number({ min: 1, max: 49 }),
    idProduct: faker.datatype.number({ min: 1, max: 499 }),
    rate: faker.datatype.number({ min: 1, max: 5 }),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ratings', ratings, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ratings', null, {})
  },
}
