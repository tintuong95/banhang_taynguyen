 function Validate() {}

Validate.prototype.required = { required: true, message: "Vui lòng nhập đầy đủ! " };
Validate.prototype.title = {
  pattern: "^.{10,50}$",
  message: "Khoảng từ 10 - 50 ký tự",
};

Validate.prototype.description = {
  pattern: "^.{30,70}$",
  message: "Khoảng từ 30 - 70 ký tự",
};
Validate.prototype.phone = {
  pattern: "/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/",
  message: "Không đúng định dạng số điện thoại",
};

Validate.prototype.price = {
  pattern: "^s*-?[0-9]{5,10}s*$",
  message: "Tối thiểu 10.000 ",
};


export default new Validate()
