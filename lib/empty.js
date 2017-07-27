const each = require('seebigs-each');
const insert = require('../utils/insert.js');

/**
 * Delete all child nodes from each of the matched nodes
 */
function empty () {
    this.each(function (match) {
        each(match, function (value, key) {
            if (key === 'body') {
                if (Array.isArray(value)) {
                    match.body = [];
                } else if (Array.isArray(value.body)) {
                    match.body.body = [];
                }
            }
        });
    });
    return this;
}

module.exports = empty;
