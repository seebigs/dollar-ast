const AstLayer = require('../utils/ast.js');
const each = require('../utils/each.js');
const insert = require('../utils/insert.js');
const jsonifier = require('../utils/jsonifier.js');
const parse = require('../utils/parse.js');
const walker = require('../utils/walker.js');

const wrapperIdentifier = '___';

function matchesWrapperIdentifier (node) {
    return (node.type === 'Identifier' && node.name === wrapperIdentifier) ||
        (node.type === 'Literal' && node.value === wrapperIdentifier);
}

// function findWrapperNodeAddress (wrapper, address) {
//     each(wrapper, function (value, key) {
//         if (value && key !== 'parent') {
//             if (Array.isArray(value)) {
//                 each(value, function (arrMember, arrIndex) {
//                     if (arrMember && typeof arrMember.type === 'string') {
//                         if (matchesWrapperIdentifier(arrMember)) {
//                             address.parent = value;
//                             address.key = arrIndex;
//                             return false; // drop out of loop
//                         }
//                         findWrapperNodeAddress(arrMember, address);
//                     }
//                 });
//             }
//             else if (typeof value.type === 'string') {
//                 if (matchesWrapperIdentifier(value)) {
//                     address.parent = wrapper;
//                     address.key = key;
//                 } else {
//                     findWrapperNodeAddress(value, address);
//                 }
//             }
//         }
//     });
// }
//
// function wrap2 (code) {
//     let ast = this.ast;
//     let wrapper = parse(code);
//     if (wrapper.type) {
//         let wrapperAddress = {
//             parent: null,
//             key: null,
//         };
//
//         // console.log(jsonifier(wrapper));
//
//         findWrapperNodeAddress(wrapper, wrapperAddress);
//
//         // for each matched node
//         // find the matched node in program
//         // replace __ in wrapper with node
//         // then insert wrapper into program where node was
//         if (wrapperAddress.parent && typeof wrapperAddress.key !== 'undefined') {
//             each(this, function (match) {
//                 ast.walk(function (node, index) {
//                     if (node === match) {
//                         wrapperAddress.parent[wrapperAddress.key] = node;
//                         // console.log(jsonifier(wrapper));
//                         let parentType = node.parent.type;
//                         console.log(parentType);
//                         switch (parentType) {
//                             case 'CallExpression':
//                                 if (node.parent.arguments) {
//                                     node.parent.arguments = wrapper.body
//                                 }
//                             case 'ExpressionStatement':
//                                 if (node.parent.parent) {
//                                     node.parent.parent.body = wrapper.body
//                                 }
//                             default:
//                                 walker(node.parent)(function (pnode, pkey) {
//                                     if (pnode === node) {
//                                         node.parent[pkey] = wrapper.body[0].expression;
//                                     }
//                                 });
//                         }
//                     }
//                 });
//             });
//
//         } else {
//             console.log('wrapperAddress not found');
//             console.log(JSON.stringify(wrapper, null, 4));
//         }
//     }
//
//     return this;
// }


function wrap (code) {
    let _this = this;

    _this.each(function (match) {
        let wrapperAST = new AstLayer(code);

        console.log(wrapperAST.stringify());

        wrapperAST.walk(function (node) {
            if (matchesWrapperIdentifier(node)) {
                // console.log(node);
                // console.log(match);
                insert.replace([node], match);
            }
        });

        console.log();
        console.log(wrapperAST.stringify());
        console.log(wrapperAST.generate());

        let wrapperProgram = wrapperAST.get();
        insert.replace([match], wrapperProgram.body);

        console.log('\n');
        console.log(_this.ast.generate());
    });

        // insert.replace(this, wrapper);
        //
        // this.each(function (match) {
        //
        //     // console.log(JSON.stringify(wrapper, null, 4));
        //
        //     insert.replace(match, content);
        //
        //     return;
        //
        //     // get full wrapper content minus outer 'Program' node
        //     let wrappedMatch;
        //
        //
        //     // replace each match with wrappedMatch
        //     // this.each(function (match) {
        //     //     console.log(match);
        //     // });
        //
        //     // replace wrapperIdentifier with match
        //     walker(wrapper)(function (wrapperNode, wrapperKey) {
        //         if (matchesWrapperIdentifier(wrapperNode)) {
        //             console.log(_this);
        //         }
        //     });
        // });

    // console.log(this.ast.stringify());

    // return;
    //
    // if (wrapper.type) {
    //     walker(wrapper)(function (wrapperNode, wrapperKey) {
    //         if (matchesWrapperIdentifier(wrapperNode)) {
    //             console.log(_this);
    //             // replace(_this);
    //         }
    //     });
    // }
    //
    // console.log(_this.ast.stringify());
}

module.exports = wrap;
