import { program } from 'commander'
import update from './commands/update'

const KNOW_COMMANDS = ['update']

async function main(argv: string[]) {
    program
        .version('0.0.0', '-v, --version', 'Shows the version number')
        .helpOption('-h, --help', 'Show this help message')
        .usage('<command> [flags]')
        .action((command) => {
            if (!KNOW_COMMANDS.includes(command)) {
                program.help()
            }
        })

    program
        .command('help', { isDefault: true })
        .description('Show this help message')
        .action(() => program.help())

    program
        .command('update')
        .argument('<source>', 'Source file for translations')
        .argument('<destinations...>', 'Destination files for translations')
        .option('-s, --skip-prompt', 'Skip prompt for translations')
        .description(
            `Extract keys from source files and update destination files
prompting the user to input translations`,
        )
        .action(update)

    await program.parseAsync(argv)
}

export default main
