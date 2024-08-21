"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseArrayProperty;
function parseArrayProperty(array, isPerson) {
    const key = isPerson ? "people" : "multi_select";
    if (array[key].length <= 0) {
        return;
    }
    let value = "";
    for (const obj of array[key]) {
        value += obj.name + ", ";
    }
    value = value.slice(0, -2);
    return value;
}
