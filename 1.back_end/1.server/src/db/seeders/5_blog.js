'use strict'

const {faker}=require('@faker-js/faker')
let blogs = []

for (var i = 0; i < 500; i++) {
  blogs.push({
    id: i,
    title: 'Loại quả vùng quê nay thành đặc sản có tiền cũng khó mua được '+i,
    idGroupBlog: faker.datatype.number({ min: 1, max: 4 }),
    image: 'http://localhost:3000/api/img/blog/220x220_R9dSrfYq.jpg',
    param: 'loai-qua-vung-que-nay-thanh-dac-san-co-tien-cung-kho-mua-duoc-'+i,
    description: 'Rau móp là một trong những loại rau mọc dại ở Đông Nam Bộ, đây là loại rau được nhiều người ưa chuộng vì hương vị mà nó mang lại, cùng tìm hiểu thêm về nguồn gốc, đặc điểm, giá của cây rau móp để hiểu thêm nhiều thông tin về loại rau này nhé.',
    detail: `<p style="text-align:justify;">Cây rau móp có nhiều tên gọi theo từng vùng miền như cây khoai sọ gai, 
    mớp gai, cừa ráy gai, chóc gai, dã vu, thích vu, hải vu,....</p><p style="text-align:justify;">Ngoài ra cây rau móp còn 
    có tên tiếng Anh là Unicorn plant.</p><p style="text-align:justify;">Cây rau móp chủ yếu phân bổ ở Trung Quốc, Đông Bắc, 
    Đông Nam Ấn Độ, Indonesia, Lào, Malaysia, Myanmar, Nepal, Bangladesh, Bhutan, Campuchia, New Guinea, SriLanka, Thái Lan, 
    Việt Nam. Cây rau móp ở Việt Nam hay mọc nhiều ở bờ bãi ven sông, vườn rậm, ao cá, ruộng lúa,... cây rau móp được xem 
    là đặc sản của vùng Đông Nam Bộ và đồng bằng sông Cửu Long.</p><p style="text-align:justify;">&nbsp;</p><figure class="image">
   </p>`,
    status: faker.datatype.number({ min: 0, max: 1 }),
    view: faker.datatype.number({ min: 3000, max: 10000 }),
    createdAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
    updatedAt: faker.date.between('2022-01-01T00:00:00.000Z', '2022-12-01T00:00:00.000Z'),
  })}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blogs', blogs, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {})
  },
}
