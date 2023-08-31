const bcrypt = require('bcryptjs');

const hash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 7, (err, hash) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        })
    })
}

const compare = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        })
    })
}


module.exports = { hash, compare };