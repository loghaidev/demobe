const bcrypt = require('bcrypt');

var hash = (data) => {
    return bcrypt.hashSync(data, bcrypt.genSaltSync());
};

var compare = (data, hashData) => {
    return bcrypt.compareSync(data, hashData);
};

module.exports = {
    hash: hash,
    compare: compare,
};
