'use strict'

const {faker}=require('@faker-js/faker')
let commentBlogs = []
for (var i = 0; i <5000; i++) {
commentBlogs.push({
  id: i,
  idUser:faker.datatype.number({ min: 1, max: 49 }),
  idBlog: faker.datatype.number({ min: 1, max: 499 }),
  content: faker.helpers.arrayElement(['Hay ', 'Rất hay', 'Cảm ơn',"Chất lượng"]),
  createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
})
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('commentblogs', commentBlogs, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('commentblogs', null, {})
  },
}
