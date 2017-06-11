const utilsEach = require('../utils/each.js');

function each (iteratee) {
    utilsEach(this, iteratee);
    return this;
}

module.exports = each;
