'use strict'

const { faker } = require('@faker-js/faker')

let products = []

for (var i = 0; i < 500; i++) {
  products.push({
    id: i,
    idGroupProduct: faker.datatype.number({ min: 1, max: 7 }),
    unit: 'gói',
    title: 'Khoai mỡ gọt vỏ gói 400g ' + i,
    param: 'khoai-mo-got-vo-goi-400g-' + i,
    description: 'Dưa leo baby trồng tại Lâm Đồng là một giống dưa mới, được trồng khá nhiều ở nước ta, đây là một loại rau củ rất ngon, gần như là quen thuộc trong tất cả bữa ăn ở mọi gia đình. Dưa leo chứa rất nhiều chất dinh dưỡng và vitamin rất tốt cho cơ thể. Dưa leo còn có thể dụng để làm đẹp cũng rất hiệu quả.',
    detail: `<h3><strong>Ưu điểm khi mua dưa leo baby tại Tây Nguyên Food</strong></h3><p>Dưa leo tươi, ngon, trái nhỏ thon, 
    căng, mập mạp.</p><p>Dưa leo giòn, ngọt cực kỳ ngon và chất lượng.</p><p>Dưa leo được trồng tại Lâm Đồng, đảm bảo nguồn 
    gốc xuất xứ rõ ràng, đóng khay 500g khoảng 8-10 trái.</p><p>Đặt giao hàng nhanh</p><figure class="image">
    <img src="http://localhost:3000/api/img/product/dSV7ctR0.jpg"></figure><h3><strong>Giá trị dinh dưỡng của dưa leo baby
    </strong></h3><p>Trong dưa leo chứa nhiều nước, các vitamin C, vitamin K, … cùng những khoáng chất như magie, mangan, kali,...
    tốt cho sức khỏe.</p><p>Trong 100g dưa leo có khoảng <strong>15 Kcal</strong>.</p><figure class="image">
    <img src="http://localhost:3000/api/img/product/xenoiAl7.jpg"></figure><h3><strong>Tác dụng của dưa leo đối với sức khỏe
    </strong></h3><p>Cung cấp chất oxy hóa</p><p>Làm giảm huyết áp</p><p>Ngăn ngừa ung thư</p><p>Giúp xương chắc khỏe</p><figure class="image">
    `,
    price: faker.random.numeric() * 10000 + faker.random.numeric() * 1000,
    image: 'http://localhost:3000/api/img/blog/220x220_R9dSrfYq.jpg',
    status: faker.datatype.number({ min: 0, max: 1 }),
    sale: faker.datatype.number({ min: 0, max: 50 }),
    height: faker.datatype.number({ min: 15, max: 30 }),
    length: faker.datatype.number({ min: 15, max: 30 }),
    weight: faker.datatype.number({ min: 100, max: 300 }),
    width: faker.datatype.number({ min: 15, max: 30 }),
    view: faker.datatype.number({ min: 1500, max: 3000 }),
    amount: faker.datatype.number({ min: 10, max: 100 }),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2023-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2023-12-01T00:00:00.000Z'),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', products, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  },
}
