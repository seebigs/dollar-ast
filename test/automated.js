const FeatherTest = require('feather-test');

const tests = new FeatherTest({
    specs: './specs',
    // specs: './specs/wrap.spec.js',
    // specs: './specs/replace.spec.js',
    // specs: './specs/find.spec.js',
});

tests.run();
