const each = require('../utils/each.js');

function parseForInsertion (code) {
    return {
        type: 'VariableDeclarator'
    };
}

function normalizeContent (contentArr, flattenedArguments) {
    let content, contentType;

    each(flattenedArguments, function (arg, i) {
        content = arg;
        contentType = typeof content;

        if (content) {
            if (contentType === 'string') {
                contentArr.push(parseForInsertion(content));

            } else if (contentType === 'function') {
                let returnValue = [content(arg, i)];
                normalizeContent(contentArr, returnValue);

            } else if (typeof content.type === 'string') {
                contentArr.push(content);

            } else if (content.length) {
                normalizeContent(contentArr, content);
            }
        }
    });
}

function insertNodes (matches, contentArr) {
    each(matches, function (match) { // for each node in the dollar collection
        each(match.parent, function (value, key) { // for each key:value in the parent node
            if (Array.isArray(value)) {
                let newContents = [];
                each(value, function (node, index) { // for each node within an array of nodes
                    if (node === match) {
                        each(contentArr, function (content) {
                            newContents.push(content);
                        });
                    }
                    newContents.push(node);
                });
                match.parent[key] = newContents;
            }
        });
    });
}

function before () {
    // Flatten nested arrays
    let flattenedArguments = [].concat.apply([], arguments);
    let contentArr = [];

    normalizeContent(contentArr, flattenedArguments);

    insertNodes(this, contentArr);

    return this;
}

module.exports = before;
