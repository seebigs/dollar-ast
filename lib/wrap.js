const each = require('../utils/each.js');
const jsonifier = require('../utils/jsonifier.js');
const parse = require('../utils/parse.js');
const walker = require('../utils/walker.js');

function matchesWrapperIdentifier (node) {
    return (node.type === 'Identifier' && node.name === '___') ||
        (node.type === 'Literal' && node.value === '___');
}

function findWrapperNodeAddress (wrapper, address) {
    each(wrapper, function (value, key) {
        if (value && key !== 'parent') {
            if (Array.isArray(value)) {
                each(value, function (arrMember, arrIndex) {
                    if (arrMember && typeof arrMember.type === 'string') {
                        if (matchesWrapperIdentifier(arrMember)) {
                            address.parent = value;
                            address.key = arrIndex;
                            return false; // drop out of loop
                        }
                        findWrapperNodeAddress(arrMember, address);
                    }
                });
            }
            else if (typeof value.type === 'string') {
                if (matchesWrapperIdentifier(value)) {
                    address.parent = wrapper;
                    address.key = key;
                } else {
                    findWrapperNodeAddress(value, address);
                }
            }
        }
    });
}

function wrap (code) {
    let ast = this.ast;
    let wrapper = parse(code);
    if (wrapper.type) {
        let wrapperAddress = {
            parent: null,
            key: null,
        };

        // console.log(jsonifier(wrapper));

        findWrapperNodeAddress(wrapper, wrapperAddress);

        // for each matched node
        // find the matched node in program
        // replace __ in wrapper with node
        // then insert wrapper into program where node was
        if (wrapperAddress.parent && typeof wrapperAddress.key !== 'undefined') {
            each(this, function (match) {
                ast.walk(function (node, index) {
                    if (node === match) {
                        wrapperAddress.parent[wrapperAddress.key] = node;
                        // console.log(jsonifier(wrapper));
                        let parentType = node.parent.type;
                        console.log(parentType);
                        switch (parentType) {
                            case 'CallExpression':
                                if (node.parent.arguments) {
                                    node.parent.arguments = wrapper.body
                                }
                            case 'ExpressionStatement':
                                if (node.parent.parent) {
                                    node.parent.parent.body = wrapper.body
                                }
                            default:
                                walker(node.parent)(function (pnode, pkey) {
                                    if (pnode === node) {
                                        node.parent[pkey] = wrapper.body[0].expression;
                                    }
                                });
                        }
                    }
                });
            });

        } else {
            console.log('wrapperAddress not found');
            console.log(JSON.stringify(wrapper, null, 4));
        }
    }

    return this;
}

module.exports = wrap;
