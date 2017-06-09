
let foo = 123;

function privateMethod() {
    return foo;
}

function publicMethod(one, two) {
    return one + two;
}

module.exports = {
    publicMethod,
};
