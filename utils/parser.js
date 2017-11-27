const parser = require('acorn').parse;

function printAdditionalErrorContext (rawCode, err) {
    const errFirstLine = err.stack.split('\n')[0];
    let errLine = errFirstLine.substr(errFirstLine.lastIndexOf('(') + 1);
    const errLineSplit = errLine.split(':');
    errLine = parseInt(errLineSplit[0]);
    const errCol = parseInt(errLineSplit[1]);
    const badLine = rawCode.split('\n')[errLine - 1];
    console.log('\nError parsing code at:');
    console.log(badLine.substring(errCol - 100, errCol + 100));
    console.log();
}

function parse (code, options) {
    try {
        return typeof code === 'string' ? parser(code, options) : code;

    } catch (err) {
        if (typeof code === 'string') {
            printAdditionalErrorContext(code, err);
        }
        throw new SyntaxError(err.message);
    }
}

module.exports = parse;
