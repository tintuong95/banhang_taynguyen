'use strict'

const {faker}=require('@faker-js/faker')
let images = []
for (var i = 0; i < 5000; i++) {
  images.push({
    id: i,
    idProduct: faker.datatype.number({ min: 1, max: 499 }),
    image: faker.helpers.arrayElement([
      'http://localhost:3000/api/img/product/540x450_CDCsHScy.jpg',
      'http://localhost:3000/api/img/product/540x450_rnWJFffg.jpg',
      'http://localhost:3000/api/img/product/540x450_WfQkWBeO.jpg',
      'http://localhost:3000/api/img/product/540x450_zEkaEJJy.jpg'
    ]),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  })
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('images', images, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {})
  },
}
