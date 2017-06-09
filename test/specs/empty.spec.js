
const $AST = require('../../index.js');

describe('empty', (expect) => {
    const $ = new $AST();
    expect($().collect([1,2,3]).empty().length).toBe(0);
});
