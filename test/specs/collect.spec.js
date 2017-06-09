
const $AST = require('../../index.js');

describe('collect', (expect) => {
    const $ = new $AST();
    expect($().collect([1,2,3]).collect([4,5,6]).length).toBe(6);
});
