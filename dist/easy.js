"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = add;
function add(a, b) {
    return a + b;
}
const test1 = add(1, 3);
if (test1 == 4) {
    console.log('Passed');
}
else {
    console.log('Failed');
}
