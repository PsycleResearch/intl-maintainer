import type { Command } from 'commander'

type UpdateCommandOptions = {
    readonly skipPrompt: boolean
}
export default async function update(
    source: string,
    destinations: string[],
    option: UpdateCommandOptions,
    command: Command,
) {
    console.log('Source : ' + source)
    console.log('Dest : ' + destinations.concat(', '))
    console.log('Option : ' + JSON.stringify(option))
    console.log('Command : ' + command.name())
    process.exit(0)
}
