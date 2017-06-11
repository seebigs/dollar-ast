
function eq (index) {
    index = Array.isArray(index) ? NaN : parseInt(index, 10); // prevent parsing array of numbers
    let results = [index >= 0 ? this[index] : this[this.length + index]];
    this.empty();
    return this.concat(results);
}

module.exports = eq;
