
function get (node) {
    let nodeType = node.type;
    
    if (node.id) {
        return node.id.name;
    } else if (nodeType === 'CallExpression') {
        return node.callee.name;
    } else if (nodeType === 'ReturnStatement') {
        return node.argument.name;
    } else if (nodeType === 'MemberExpression') {
        return node.object.name;
    } else if (nodeType === 'AssignmentExpression') {
        return node.left.name;
    } else if (nodeType === 'ExpressionStatement') {
        return node.expression.name;
    } else if (nodeType === 'NewExpression') {
        return node.callee.name;
    }
}

module.exports = {
    get,
};
