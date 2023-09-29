type Compartment = {
    name: string
    abbr: string
    connected?: Compartment[]
    derivative: string
}

type Model = {
    meta?: {
        title?: string
        author?: string
        date?: string
        version?: string
    }
    compartments: {
        [key: Compartment['abbr']]: {
            name: Compartment['name']
            connected?: Compartment['abbr'][]
        }
    }
    system: {
        [key: Compartment['abbr']]: Compartment['derivative']
    }
    parameters: {
        [key: string]: string
    }
    initialStates: {
        [key: string]: string
    }
    variables: {
        [key: string]: string | number
    }
}

export { Compartment, Model }
