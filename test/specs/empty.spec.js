
const $AST = require('../../index.js');

describe('empty', (expect) => {
    const $ = new $AST();
    expect($().concat([1,2,3]).empty().length).toBe(0);
});
