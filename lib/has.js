
function has (selector) {
    let _this = this;

    if (!selector) {
        return _this.empty();
    }

    return _this.filter(function () {
        return !!_this.find(selector, this).length;
    });
}

module.exports = has;
