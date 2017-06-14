
function walk (node, iteratee, skipNode) {
    let keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key === 'parent' || key === 'prev') continue;

        let value = node[key];
        if (Array.isArray(value)) {
            for (let j = 0; j < value.length; j++) {
                let arrMember = value[j];
                if (arrMember && typeof arrMember.type === 'string') {
                    arrMember.prev = j > 0 ? value[j-1] : null;
                    arrMember.parent = node;
                    walk(arrMember, iteratee);
                }
            }
        }
        else if (value && typeof value.type === 'string') {
            value.parent = node;
            walk(value, iteratee);
        }
    }
    if (typeof iteratee === 'function' && !skipNode) {
        iteratee(node);
    }
}

function walker (ast, skipTopNode) {
    return function (iteratee) {
        walk(ast, iteratee, skipTopNode);
    };
}

module.exports = walker;
