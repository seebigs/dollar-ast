const each = require('../utils/each.js');
const parse = require('../utils/parse.js');

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

function insertAsSibling (toBeAdded, matches, options) {
    each(matches, function (match) { // for each node in the matched collection
        each(match.parent, function (value, key) { // for each key:value in the parent of each matched node
            if (Array.isArray(value)) {
                let newContents = [];
                each(value, function (node, index) { // for each node within an array-like-value
                    if (!options.before) {
                        newContents.push(node);
                    }
                    if (node === match) {
                        each(toBeAdded, function (content) {
                            newContents.push(content);
                        });
                    }
                    if (options.before) {
                        newContents.push(node);
                    }
                });
                match.parent[key] = newContents;
            }
        });
    });
}

function insertInside (toBeAdded, matches, options) {
    each(matches, function (match) { // for each node in the matched collection
        if (match.body) {
            let bodyArray = Array.isArray(match.body) ? match.body : match.body.body;
            if (options.before) {
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

function insert (arrayOfContents, matches, options = { asSibling: false, before: false }) {
    let flattenedContents = [].concat.apply([], arrayOfContents); // Flatten nested arrays
    let toBeAdded = [];
    normalizeContent(toBeAdded, flattenedContents);
    if (options.asSibling) {
        insertAsSibling(toBeAdded, matches, options);
    } else {
        insertInside(toBeAdded, matches, options);
    }
}

module.exports = insert;
