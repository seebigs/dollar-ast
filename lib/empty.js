
function empty () {
    if (this.length) {
        for (let i = this.length - 1; i >= 0; i--) {
            delete this[i];
        }
        this.length = 0;
    }

    return this;
}

module.exports = empty;
