
let foo = 123;

function privateMethod() {
    return foo;
}

function publicMethod(one, two) {
    let foo = 456;

    function inner() {
        // do things
    }

    return one + two;
}

module.exports = {
    publicMethod,
};
