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
        [key: string]: Compartment
    }
    parameters: {
        [key: string]: string
    }
    initialStates: {
        [key: string]: string
    }
    variables: {
        [key: string]: string
    }
}

export { Compartment, Model }
