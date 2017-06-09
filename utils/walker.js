
function walk (node, parent, iteratee) {
    let keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key === 'parent') continue;

        let child = node[key];
        if (Array.isArray(child)) {
            for (let j = 0; j < child.length; j++) {
                let c = child[j];
                if (c && typeof c.type === 'string') {
                    c.parent = node;
                    walk(c, node, iteratee);
                }
            }
        }
        else if (child && typeof child.type === 'string') {
            child.parent = node;
            walk(child, node, iteratee);
        }
    }
    iteratee(node);
}

function walker (ast) {
    return function (iteratee) {
        walk(ast, null, iteratee);
    };
}

module.exports = walker;
