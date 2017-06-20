const each = require('../utils/each.js');
const parse = require('../utils/parse.js');

/**
 * Normalizes different types of content input into the same thing
 * Always returns an Array of nodes
 */
function normalizeContent (toBeAdded, flattenedArguments) {
    let content, contentType;

    each(flattenedArguments, function (arg, i) {
        content = arg;
        contentType = typeof content;

        if (content) {
            if (contentType === 'string') {
                normalizeContent(toBeAdded, parse(content).body);

            } else if (contentType === 'function') {
                let returnValue = [content(arg, i)];
                normalizeContent(toBeAdded, returnValue);

            } else if (typeof content.type === 'string') {
                toBeAdded.push(content);

            } else if (content.length) {
                normalizeContent(toBeAdded, content);
            }
        }
    });
}

function insertAsSibling (matches, toBeAdded, before) {
    each(matches, function (match) {
        if (match._) {
            if (Array.isArray(match._._containerParent)) {
                let newContents = [];
                each(match._._containerParent, function (node, index) {
                    if (!before) {
                        newContents.push(node);
                    }
                    if (node === match) {
                        each(toBeAdded, function (content) {
                            newContents.push(content);
                        });
                    }
                    if (before) {
                        newContents.push(node);
                    }
                });
                match._._nodeParent[match._._nodeKey] = newContents;
            } else {
                throw new Error('Sibling nodes can only be inserted into an Array: "' + match.type + '" is not an Array');
            }
        }
    });
}

function insertInside (matches, toBeAdded, before) {
    each(matches, function (match) {
        if (match.body) {
            let bodyArray = Array.isArray(match.body) ? match.body : match.body.body;
            if (before) {
                each(toBeAdded, function (content) {
                    bodyArray.unshift(content);
                });
            } else {
                each(toBeAdded, function (content) {
                    bodyArray.push(content);
                });
            }
        }
    });
}

function insertReplace (matches, toBeAdded) {
    let newContent = toBeAdded[0];
    each(matches, function (match) {
        if (match._) {
            if (newContent.type === 'ExpressionStatement') {
                newContent = newContent.expression;
            }
            match._._containerParent[match._._containerKey] = newContent;
        }
    });
}

function insert (matches, arrayOfContents, before, insertMethod) {
    let flattenedContents = [].concat.apply([], arrayOfContents); // Flatten nested arrays
    let toBeAdded = [];
    normalizeContent(toBeAdded, flattenedContents);
    insertMethod(matches, toBeAdded, before);
}

module.exports = {

    asSibling: function (matches, arrayOfContents, before) {
        insert(matches, arrayOfContents, before, insertAsSibling);
    },

    inside: function (matches, arrayOfContents, before) {
        insert(matches, arrayOfContents, before, insertInside);
    },

    replace: function (matches, contents) {
        insert(matches, [contents], null, insertReplace);
    }
};
