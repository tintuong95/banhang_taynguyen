'use strict'

const {faker}=require('@faker-js/faker')

let users=[]
for(var i=1;i<=50;i++){
users.push({
  id: i,
  password: '$2b$11$K7py8nOND9QGgu7391nBMeTguByerYcZH9XXY0LNvNgXqc93nFVeK', //123456
  username: faker.internet.userName(),
  fullname: faker.name.fullName(),
  phone: faker.phone.number(),
  type:faker.helpers.arrayElement(['website', 'google', 'facebook']) ,
  status: 1,
  address: faker.address.streetAddress(),
  createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
})
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
