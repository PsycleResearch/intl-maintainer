import { Messages } from '@formatjs/ts-transformer'
import { describe, expect, test } from '@jest/globals'
import { makeDiff, mergeMessages } from './update'

describe('update command', () => {
    test('diff with empty source and non empty destination', async () => {
        const source: Messages = {}
        const destination: Messages = {
            id1: {
                id: 'id1',
            },
        }

        const { keysToAdd, keysToKeep, removeCount } = await makeDiff(
            source,
            destination,
        )

        expect(removeCount).toBe(1)
        expect(keysToAdd).toHaveLength(0)
        expect(keysToKeep).toHaveLength(0)
    })

    test('diff with non empty source and empty destination', async () => {
        const source: Messages = {
            id1: {
                id: 'id1',
            },
        }
        const destination: Messages = {}

        const { keysToAdd, keysToKeep, removeCount } = await makeDiff(
            source,
            destination,
        )

        expect(removeCount).toBe(0)
        expect(keysToAdd).toHaveLength(1)
        expect(keysToAdd[0]).toBe('id1')
        expect(keysToKeep).toHaveLength(0)
    })

    test('diff with empty source and empty destination', async () => {
        const source: Messages = {}
        const destination: Messages = {}

        const { keysToAdd, keysToKeep, removeCount } = await makeDiff(
            source,
            destination,
        )

        expect(removeCount).toBe(0)
        expect(keysToAdd).toHaveLength(0)
        expect(keysToKeep).toHaveLength(0)
    })

    test('diff with non empty source and non empty destination', async () => {
        const source: Messages = {
            id1: {
                id: 'id1',
            },
            id2: {
                id: 'id2',
            },
        }
        const destination: Messages = {
            id2: {
                id: 'id2',
            },
            id3: {
                id: 'id3',
            },
        }

        const { keysToAdd, keysToKeep, removeCount } = await makeDiff(
            source,
            destination,
        )

        expect(removeCount).toBe(1)
        expect(keysToAdd).toHaveLength(1)
        expect(keysToAdd[0]).toBe('id1')
        expect(keysToKeep).toHaveLength(1)
        expect(keysToKeep[0]).toBe('id2')
    })

    test('merge with empty source and non empty destination', async () => {
        const source: Messages = {}
        const destination: Messages = {
            id1: {
                id: 'id1',
            },
        }

        const { keysToAdd, keysToKeep } = await makeDiff(source, destination)

        const result = mergeMessages(source, destination, keysToAdd, keysToKeep)

        expect(result).toEqual({})
    })

    test('merge with non empty source and empty destination', async () => {
        const source: Messages = {
            id1: {
                id: 'id1',
            },
        }
        const destination: Messages = {}

        const { keysToAdd, keysToKeep } = await makeDiff(source, destination)

        const result = mergeMessages(source, destination, keysToAdd, keysToKeep)

        expect(result).toEqual(source)
    })

    test('merge with empty source and empty destination', async () => {
        const source: Messages = {}
        const destination: Messages = {}

        const { keysToAdd, keysToKeep } = await makeDiff(source, destination)

        const result = mergeMessages(source, destination, keysToAdd, keysToKeep)

        expect(result).toEqual({})
    })

    test('merge with nonempty source and non empty destination', async () => {
        const source: Messages = {
            id1: {
                id: 'id1',
            },
            id2: {
                id: 'id2',
            },
        }
        const destination: Messages = {
            id2: {
                id: 'id2',
            },
            id3: {
                id: 'id3',
            },
        }

        const { keysToAdd, keysToKeep } = await makeDiff(source, destination)

        const result = mergeMessages(source, destination, keysToAdd, keysToKeep)

        expect(result).toEqual(source)
    })
})
