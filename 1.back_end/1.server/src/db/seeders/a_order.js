'use strict'

const { faker } = require('@faker-js/faker')

let orders = []
for (var i = 0; i <2000; i++) {
  orders.push({
    id: i,
    idUser: faker.datatype.number({ min: 1, max: 49 }),
    code: 'COD' + i + 'SAD',
    status: faker.datatype.number({ min: 0, max: 1 }),
    subtotal: faker.random.numeric() * 10000 + faker.random.numeric() * 1000,
    shipping: faker.random.numeric() * 10000 + faker.random.numeric() * 1000,
    total: faker.random.numeric() * 10000 + faker.random.numeric() * 1000,
    promo: faker.lorem.words(6),
    discount: faker.random.numeric() * 10000 + faker.random.numeric() * 1000,
    grandtotal: faker.random.numeric() * 10000 + faker.random.numeric() * 1000,
    province: faker.address.cityName(),
    district: faker.address.streetAddress(),
    commune: faker.address.city(),
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
    payment: faker.datatype.boolean(),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2023-05-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2023-05-01T00:00:00.000Z'),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {

     await queryInterface.bulkInsert('orders', orders, {})
  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {})
  },
}
