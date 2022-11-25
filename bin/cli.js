"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const update_1 = __importDefault(require("./commands/update"));
const KNOW_COMMANDS = ['update'];
async function main(argv) {
    commander_1.program
        .version('0.0.0', '-v, --version', 'Shows the version number')
        .helpOption('-h, --help', 'Show this help message')
        .usage('<command> [flags]')
        .action((command) => {
        if (!KNOW_COMMANDS.includes(command)) {
            commander_1.program.help();
        }
    });
    commander_1.program
        .command('help', { isDefault: true })
        .description('Show this help message')
        .action(() => commander_1.program.help());
    commander_1.program
        .command('update')
        .argument('<source>', 'Source file for translations')
        .argument('<destinations...>', 'Destination files for translations')
        .option('-s, --skip-prompt', 'Skip prompt for translations')
        .description(`Extract keys from source files and update destination files
prompting the user to input translations`)
        .action(update_1.default);
    await commander_1.program.parseAsync(argv);
}
exports.default = main;
//# sourceMappingURL=cli.js.map