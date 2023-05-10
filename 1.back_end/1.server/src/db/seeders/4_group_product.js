'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'groupproducts',
      [
        {
          id: 1,
          name: 'Rau củ các loại',
          param: 'rau-la-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
     
        {
          id: 2,
          name: 'Trái cây các lọai',
          param: 'trai-cay-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
        {
          id: 3,
          name: 'Hoa các lọai',
          param: 'hoa-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
        {
          id: 4,
          name: 'Đồ khô các lọai',
          param: 'do-kho-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
        {
          id: 5,
          name: 'Đồ tươi sống các loại',
          param: 'do-tuoi-song-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
        {
          id: 6,
          name: 'Mật ong các loại',
          param: 'mat-ong-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
        {
          id: 7,
          name: 'Rượu các loại',
          param: 'ruou-cac-loai',
          createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
          updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
        },
       
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('groupproducts', null, {})
  },
}
