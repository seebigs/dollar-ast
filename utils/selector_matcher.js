
function selectorMatcher (selector) {
    let selectorType = typeof selector;

    // HANDLE: string selector
    if (selectorType === 'string') {
        let type = (selector.match(/^(\w+)/) || [])[1];
        let id = (selector.match(/#([\w-]+)/) || [])[1];
        let attr = (selector.match(/\[([\w-]+)=?([\w-]+)?\]/) || []);

        return function (node) {
            if (!node || typeof node.type !== 'string') {
                return false;
            }

            let matchNodeType = false;
            if (type) {
                if (node.type === type) {
                    matchNodeType = true;
                }
            } else {
                matchNodeType = true;
            }

            let matchId = false;
            if (id) {
                let idName = null;

                if (node.id) {
                    idName = node.id.name;
                } else if (node.callee) {
                    idName = node.callee.name;
                } else if (node.name) {
                    idName = node.name.name;
                } else if (node.init) {
                    idName = node.init.name;
                } else if (node.argument) {
                    idName = node.argument.name;
                } else if (node.key) {
                    idName = node.key.name;
                }

                if (idName === id) {
                    matchId = true;
                }
            } else {
                matchId = true;
            }

            let matchAttr = false;
            if (attr.length) {
                if (attr[2]) {
                    let nodeVal = node[attr[1]];
                    if (Array.isArray(nodeVal)) {
                        if (nodeVal.length === parseInt(attr[2], 10)) {
                            matchAttr = true;
                        }
                    } else {
                        if (('' + nodeVal) === attr[2]) {
                            matchAttr = true;
                        }
                    }

                } else {
                    if (typeof node[attr[1]] !== 'undefined') {
                        matchAttr = true;
                    }
                }
            } else {
                matchAttr = true;
            }

            return matchNodeType && matchId && matchAttr;
        };

    // HANDLE: function
    } else if (selectorType === 'function') {
        return function (node, i) {
            return !!selector.call(node, node, i);
        };

    // HANDLE: node
    } else if (typeof selector.type === 'string') {
        return function (node) {
            return selector === node;
        };

    // HANDLE: array
    } else if (selector.length) {
        return function (node) {
            return selector.indexOf(node) !== -1;
        };
    }

    return function () {
        return false;
    }
}

module.exports = selectorMatcher;
