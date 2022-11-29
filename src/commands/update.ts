import type { Command } from 'commander'
import path from 'path'
import fs from 'fs-extra'
import stringify from 'json-stable-stringify'
import type { Messages } from '@formatjs/ts-transformer'

export interface UpdateCommandOptions {
    readonly dryRun: boolean
    readonly outputToCli: boolean
}
export default async function update(
    source: string,
    destinations: string[],
    option: UpdateCommandOptions,
    command: Command,
): Promise<void> {
    const fullSource = path.resolve(process.cwd(), source)
    const fullDestinations = destinations
        .filter(
            (dest) =>
                dest !== undefined &&
                dest !== null &&
                dest !== '' &&
                dest.trim() !== '',
        )
        .map((dest) => path.resolve(process.cwd(), dest))

    const sourceMessages = await extractMessagesFromFile(fullSource)

    for (let i = 0; i < fullDestinations.length; i++) {
        const destination = destinations[i]

        console.log('Processing ' + destination)

        const exists = await fs.pathExists(destination)

        let destinationMessages = {}
        if (!exists && !option.dryRun) {
            console.log('Creating file')
            await fs.writeJSON(destination, {})
        }

        try {
            destinationMessages = await extractMessagesFromFile(destination)
        } catch {}

        const { keysToAdd, keysToKeep, removeCount } = makeDiff(
            sourceMessages,
            destinationMessages,
        )

        console.log(`${removeCount} keys to remove`)
        console.log(`${keysToAdd.length} keys to add`)

        const newMessages = mergeMessages(
            sourceMessages,
            destinationMessages,
            keysToAdd,
            keysToKeep,
        )

        if (option.outputToCli) {
            console.log(formatMessages(newMessages))
        }

        if (!option.dryRun) {
            await dumpMessagesToFile(destination, newMessages)
        }
    }

    process.exit(0)
}

export interface DiffResult {
    readonly keysToKeep: string[]
    readonly keysToAdd: string[]
    readonly removeCount: number
}
export function makeDiff(
    sourceMessages: Messages,
    destinationMessages: Messages,
): DiffResult {
    const sourceKeys = Object.keys(sourceMessages)
    const destKeys = Object.keys(destinationMessages)

    const keysToKeep = destKeys.filter((key) => sourceKeys.includes(key))
    const keysToAdd = sourceKeys.filter((key) => !destKeys.includes(key))

    const removeCount = destKeys.length - keysToKeep.length

    return { keysToKeep, keysToAdd, removeCount }
}

export async function extractMessagesFromFile(path: string): Promise<Messages> {
    return await fs.readJSON(path)
}

export function formatMessages(messages: Messages): string {
    return stringify(messages, { space: 4 })
}

export async function dumpMessagesToFile(
    path: string,
    messages: Messages,
): Promise<void> {
    const newTextResult = formatMessages(messages)
    return await fs.promises.writeFile(path, newTextResult)
}

export function mergeMessages(
    sourceMessages: Messages,
    destinationMessages: Messages,
    keysToAdd: string[],
    keysToKeep: string[],
): Messages {
    return {
        ...keysToKeep.reduce(
            (acc, key) => ({
                ...acc,
                [key]: destinationMessages[key],
            }),
            {},
        ),
        ...keysToAdd.reduce(
            (acc, key) => ({
                ...acc,
                [key]: sourceMessages[key],
            }),
            {},
        ),
    }
}
