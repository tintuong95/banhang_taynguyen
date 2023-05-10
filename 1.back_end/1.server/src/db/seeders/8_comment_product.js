'use strict'

const {faker}=require('@faker-js/faker')
let commentProducts = []
for (var i = 0; i < 5000; i++) {
  commentProducts.push({
    id: i,
    idUser: faker.datatype.number({ min: 1, max: 49 }),
    idProduct: faker.datatype.number({ min: 1, max: 499 }),
    content: faker.helpers.arrayElement(['Rất tốt ', 'Uy tín', 'Chất lượng', "Rất uy tín", "Giao hàng nhanh", "Đúng sản phẩm", "Rất chất lượng"]),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  })
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('commentproducts', commentProducts, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('commentproducts', null, {})
  },
}
