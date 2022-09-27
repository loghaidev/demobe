const { timezone } = require('../configs/timezone');

class Products {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = +data.price;
    this.sex = data.sex;
    this.type = data.type;
    this.description = data.description;
    this.images = data.images;
    this.count = data.count;
    this.created_at = timezone().format();
  }
}

module.exports = { Products };
