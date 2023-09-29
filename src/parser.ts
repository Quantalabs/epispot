/**
 * Parses the input string and returns an object containing model information.
 *
 * @param {string} input - The input string to be parsed.
 * @return {object} - An object containing model information.
 */
// eslint-disable-next-line complexity
const parse = (input: string) => {
    const modelInfo = {
        meta: {},
        compartments: {},
        system: {},
        parameters: {},
        initialStates: {},
        variables: {}
    }

    // Parse frontmatter
    let fmUnparsed = ''
    const fmKeys = input.split('---')[1].split('\n')

    for (let i = 1; i < fmKeys.length - 1; i++) {
        // Replace key: value with "key":"value"
        fmUnparsed +=
            '"' +
            fmKeys[i].split(':')[0].trim() +
            '"' +
            ': ' +
            '"' +
            fmKeys[i].split(':')[1].trim() +
            '",'
    }

    // Remove any trailing commas
    fmUnparsed = fmUnparsed.slice(0, -1)

    const fm = JSON.parse('{' + fmUnparsed + '}')

    if (fm.version != 'v1') {
        throw new Error(`Unsupported schema: ${fm.version}.
This parser only supports v1 schema.`)
    }

    modelInfo['meta'] = fm

    // Parse model
    const sections = input.split('== ')

    for (let i = 0; i < sections.length; i++) {
        if (sections[i].startsWith('c\n')) {
            const lines = sections[i].replace('c\n', '').trim().split('\n')
            const compartments: {
                [key: string]: { name: string; connected?: string[] }
            } = {}

            for (let j = 0; j < lines.length; j++) {
                const line = lines[j].split(',')

                line[3] = line.slice(3).join(',')

                compartments[line[0]] = {
                    name: line[1].trim(),
                    derivative: line[2].trim()
                }

                compartments[line[0]]['connected'] = line[3]
                    .split(',')
                    .map(x => x.trim())
            }

            modelInfo['compartments'] = compartments
        } else if (sections[i].startsWith('p\n')) {
            const lines = sections[i].replace('p\n', '').trim().split('\n')
            const parameters: { [key: string]: string } = {}

            for (let j = 0; j < lines.length; j++) {
                const line = lines[j].split('=')

                parameters[line[0]] = line[1].trim()
            }

            modelInfo['parameters'] = parameters
        } else if (sections[i].startsWith('i\n')) {
            const lines = sections[i].replace('i\n', '').trim().split('\n')
            const initialStates: { [key: string]: string } = {}

            for (let j = 0; j < lines.length; j++) {
                const line = lines[j].split('=')

                initialStates[line[0]] = line[1].trim()
            }

            modelInfo['initialStates'] = initialStates
        } else if (sections[i].startsWith('v\n')) {
            const lines = sections[i].replace('v\n', '').trim().split('\n')
            const variables: { [key: string]: string } = {}

            for (let j = 0; j < lines.length; j++) {
                const line = lines[j].split('=')

                variables[line[0]] = line[1].trim()
            }

            modelInfo['variables'] = variables
        }
    }

    return modelInfo
}

export default parse
