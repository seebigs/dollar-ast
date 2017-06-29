
function attr (name, value) {
    if (typeof name !== 'string' || !this[0]) {
        return;
    }

    let prop = this[0];
    let nameComponents = name.split('.');
    let lastComponent = nameComponents.pop();

    // setter
    if (typeof value !== 'undefined') {
        nameComponents.forEach(function (nameComponent) {
            if (typeof prop[nameComponent] === 'undefined') {
                prop[nameComponent] = {};
            }
            prop = prop[nameComponent] || prop;
        });
        prop[lastComponent] = value;
        return this;
    }

    // getter
    nameComponents.forEach(function (nameComponent) {
        prop = prop[nameComponent] || prop;
    });

    return prop[lastComponent];
}

module.exports = attr;
