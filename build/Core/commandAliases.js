"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliases = {
    move: ["m", "mv"],
    request: ["req", "r"],
    archive: ["a"],
};
const remappedAliases = {};
for (let key in aliases) {
    let value = aliases[key];
    value.forEach((alias) => {
        remappedAliases[alias] = key;
    });
}
exports.default = remappedAliases;
