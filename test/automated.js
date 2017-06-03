const FeatherTest = require('feather-test');

const tests = new FeatherTest({
    specs: './specs',
});

tests.run();
