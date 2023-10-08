import { Model, Compartment } from './model.js'

/**
 * Creates an SIR model with the given parameters
 *
 * @param {string} N - The total population
 * @param {string} beta - The infection rate
 * @param {string} gamma - The recovery rate
 * @param {string} S - The initial number of susceptible individuals
 * @param {string} I - The initial number of infected individuals
 * @param {string} R - The initial number of recovered individuals
 * @param { { title?: string, author?: string, date?: string, version?: string } } meta - The metadata of the model
 *
 * @returns { Model } An SIR model with the given parameters
 */
const sir = (
    N: string,
    beta: string,
    gamma: string,
    S: string,
    I: string,
    R: string,
    meta: { title?: string; author?: string; date?: string; version?: string }
): Model => {
    const Susceptible: Compartment = {
        name: 'Susceptible',
        abbr: 'S',
        connected: [],
        derivative: `-(β*S*I)/N`
    }
    const Infected: Compartment = {
        name: 'Infected',
        abbr: 'I',
        connected: [],
        derivative: `(β*S*I)/N - γ*I`
    }
    const Recovered: Compartment = {
        name: 'Removed',
        abbr: 'R',
        connected: [],
        derivative: `γ*I`
    }

    Infected.connected = [Recovered]
    Susceptible.connected = [Infected]

    const SIR: Model = {
        meta: meta,
        compartments: {
            S: Susceptible,
            I: Infected,
            R: Recovered
        },
        parameters: {
            β: beta,
            γ: gamma
        },
        initialStates: {
            S: S,
            I: I,
            R: R
        },
        constants: {
            N: N
        }
    }

    return SIR
}

export { sir }
