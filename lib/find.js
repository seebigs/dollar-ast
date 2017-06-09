
// always returns an array of nodes to use as context
function normalizeContext (_this, context) {
    if (typeof context === strType) {
        return findByString(context);
    }

    // if (context.isDollar) {
    //     return context.get();
    // }

    if (Array.isArray(context)) {
        return context;
    }

    if (typeof context === 'object') {
        return [context];
    }

    return [_this.ast];
}

function findByString (_this, selector, context) {
    let results = [];

    // if (context) {
    //     context = normalizeContext(this, context);
    //
    //     if (context.length > 1) {
    //         for (let i = 0, len = context.length; i < len; i++) {
    //             results = results.concat(findByString(selector, context[i]));
    //         }
    //
    //         return results;
    //
    //     } else {
    //         context = context[0];
    //     }
    //
    // } else {
    //     context = this.ast;
    // }

    let selectorsMap = (/^\s*([\w]*)?(?:#([\w-]*))?(?:\.([\w-]*))?\s*$/).exec(selector);
    // selectorsMap will return:
    // ['NodeType#id.kind', 'NodeType', 'id', 'kind']
    // or null

    console.log(selectorsMap);
    console.log();

    if (selectorsMap) {

        _this.walk(function (node) {
            let matchNodeType = false;
            if (selectorsMap[1]) {
                if (node.type === selectorsMap[1]) {
                    matchNodeType = true;
                }
            } else {
                matchNodeType = true;
            }

            let matchId = false;
            if (selectorsMap[2]) {
                if (node.id && node.id.name === selectorsMap[2]) {
                    matchId = true;
                }
            } else {
                matchId = true;
            }

            let matchKind = false;
            if (selectorsMap[3]) {
                if (node.kind === selectorsMap[3]) {
                    matchKind = true;
                }
            } else {
                matchKind = true;
            }

            if (matchNodeType && matchId && matchKind) {
                results.push(node);
            }
        });

        console.log(results);

    // HANDLE: special pseudo-selectors
    } else {
        // var pseudoSelector = /(.*)\:(.+)/.exec(selector);
        // if (pseudoSelector) {
        //     var tag = pseudoSelector[1] || '*';
        //     var pseudoPieces = pseudoSelector[2].split('(');
        //     var pseudoMatcher = pseudoMatchers[pseudoPieces[0]];
        //     if (pseudoMatcher) {
        //         return pseudoMatcher(tag, context, pseudoPieces);
        //     }
        // }
    }

    // HANDLE: all other selectors
    // return arrSlice.call(context.querySelectorAll(selector));

    return results;
}

function find(selector, context) {
    // context can be undefined, a node, an array of nodes, or a $ instance (which is an array of nodes)
    // default context is current set of matched nodes or top-level ast node

    if (!selector) {
        return this;
    }

    findByString(this, selector, context);

    // // populate matches
    // this.empty();
    // this.collect([this.ast.body[0]]);

    return this;
}

module.exports = find;
