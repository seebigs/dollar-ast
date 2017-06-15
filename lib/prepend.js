const insert = require('../utils/insert.js');

function prepend () {
    insert(arguments, this, {
        asSibling: false,
        before: true,
    });
    return this;
}

module.exports = prepend;
