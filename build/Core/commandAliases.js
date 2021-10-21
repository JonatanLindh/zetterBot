"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliases = {
    request: ["req", "r"],
    archive: ["a"],
    move: ["m", "mv"],
};
const remappedAliases = {};
for (let key in aliases) {
    let value = aliases[key];
    value.forEach((alias) => {
        remappedAliases[alias] = key;
    });
}
exports.default = remappedAliases;
