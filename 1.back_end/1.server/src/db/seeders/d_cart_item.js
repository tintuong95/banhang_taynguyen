'use strict'

const {faker}=require('@faker-js/faker')
let cartitems = []
for (var i = 0; i < 5000; i++) {
  cartitems.push({
    id: i,
    idUser: faker.datatype.number({ min: 1, max: 49 }),
    idProduct: faker.datatype.number({ min: 1, max: 499 }),
    quantity: faker.random.numeric(),
    status: faker.datatype.number({ min: 0, max: 1 }),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  })
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cartitems', cartitems, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cartitems', null, {})
  },
}
