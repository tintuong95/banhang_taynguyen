const bcrypt = require('bcrypt');

//create string hash
function hashSync(text) {
    return bcrypt.hashSync(text, Number(process.env.SALTROUNDS) || 10)
}

//check string hash
function compareSync(text, hash) {
    return bcrypt.compareSync(text, hash)
}



module.exports = {
    hashSync,
    compareSync,
}