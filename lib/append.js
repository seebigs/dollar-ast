const insert = require('../utils/insert.js');

function append () {
    insert(arguments, this, {
        asSibling: false,
        before: false,
    });
    return this;
}

module.exports = append;
