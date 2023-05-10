'use strict'

const {faker}=require('@faker-js/faker')
let orderitems = []
for (var i = 0; i <5000; i++) {
  orderitems.push({
    id: i,
    idOrder: faker.datatype.number({ min: 1, max: 499 }),
    idProduct: faker.datatype.number({ min: 1, max: 499 }),
    quantity: faker.random.numeric(),
    
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  })

}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orderitems', orderitems, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderitems', null, {})
  },
}
