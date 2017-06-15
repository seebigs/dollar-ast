
function wrap (code) {
    if (typeof code === 'string') {
        // string
    } else if (typeof code.type === 'string') {
        // node
    }

    return this;
}

module.exports = wrap;
