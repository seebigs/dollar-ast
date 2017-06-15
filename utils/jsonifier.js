
function replacer (key, value) {
    if (value) {
        switch (key) {
            case 'parent':
                return '[ ParentNode ]';
            case 'prev':
                return '[ PrevNode ]';
        }
    }

    return value;
}

function stringifier (obj) {
    return JSON.stringify(obj, replacer, 4);
}

module.exports = stringifier;
