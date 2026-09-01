function sum(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

// Single export
module.exports = {
    add: sum, // Renaming
    sub
};

// We can only export one time using module.exports, otherwise it OVERWRITES the previous exports