const insert = require('../utils/insert.js');

function after () {
    insert(arguments, this, {
        asSibling: true,
        before: false,
    });
    return this;
}

module.exports = after;
