import { Model } from './model.js'
import * as math from 'mathjs'

/**
 * Solves the given model.
 *
 * @param {Model} model - The model to be solved.
 * @param {number} time - The duration of the simulation.
 * @param {number} [stepSize=0.1] - The time step size.
 * @return {object} - Returns an object containing an array of values for each compartment at each time step.
 */
const solve = (
    model: Model,
    time: number,
    stepSize: number = 0.1
): { [key: string]: number[] } => {
    const solution: { [key: string]: number[] } = {}

    const compartments = model.compartments
    const parameters = model.parameters
    const initialStates = model.initialStates
    const constants = model.constants

    let scope: { [key: string]: number | string } = {
        t: 0
    }

    // Solve the variables
    for (const constant in constants) {
        const node2 = math.parse(constants[constant as keyof typeof constants])
        const code2 = node2.compile()
        const result = code2.evaluate(scope)

        scope = { ...scope, [constant]: result }
    }

    for (const states in initialStates) {
        const node1 = math.parse(initialStates[states])
        const code1 = node1.compile()
        const result = code1.evaluate(scope)

        scope = { ...scope, [states]: result }
        solution[states] = [result]
    }

    for (let t = 1; t <= time; t += stepSize) {
        scope['t'] = t

        const newState: { [key: string]: number } = {}

        // Compute parameter values
        for (const parameter in parameters) {
            const node3 = math.parse(parameters[parameter])
            const code3 = node3.compile()
            const result = code3.evaluate(scope)

            scope[parameter] = result
        }

        for (const compartment in compartments) {
            const node4 = math.parse(compartments[compartment].derivative)
            const code4 = node4.compile()
            const result = code4.evaluate(scope)

            newState[compartment] = scope[compartment] + result
            solution[compartment].push(scope[compartment] + result)
        }

        // Change compartment values in scope to match values in newState
        for (const compartment in compartments) {
            scope[compartment] = newState[compartment]
        }
    }

    return solution
}

export default solve
