const decycle = require('./decycle.js');

function replacer (value, key) {
    // const metaKeys = [
    //     '_containerKey',
    //     '_nodeKey',
    // ];
    // const metaParents = [
    //     '_containerParent',
    //     '_nodeParent',
    // ];
    // if (value) {
    //     if (['_containerKey', '_nodeKey',].indexOf(key) !== -1) {
    //         return value;
    //     }
    //     if (key === '_nodeParent') {
    //         return '[ '+ value.type +' ]';
    //     }
    //     if (key === '_containerParent') {
    //         return '[ '+ (Array.isArray(value) ? 'Array' : value.type) +' ]';
    //     }
    // }
    if (key === '_') {
        return void 0;
    }
    return value;
}

function stringifier (obj) {
    return JSON.stringify(decycle(obj, replacer), null, 4);
}

module.exports = stringifier;
