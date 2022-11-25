type UpdateCommandOptions = {
    readonly skipPrompt: boolean
}
export default async function update(source: string, destinations: string[], option: UpdateCommandOptions) {
    console.log('Source : ' + source)
    console.log('Dest : ' + destinations.concat(', '))
    console.log('Option : ' + JSON.stringify(option))
    process.exit(0)
}
