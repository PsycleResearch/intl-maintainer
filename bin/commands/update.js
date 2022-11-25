"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function update(source, destinations, option, command) {
    console.log('Source : ' + source);
    console.log('Dest : ' + destinations.concat(', '));
    console.log('Option : ' + JSON.stringify(option));
    console.log('Command : ' + JSON.stringify(command.name));
    process.exit(0);
}
exports.default = update;
//# sourceMappingURL=update.js.map