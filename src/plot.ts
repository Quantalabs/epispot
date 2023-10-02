import { Model } from './model.js'
import solve from './solve.js'
import http from 'http'

/**
 * Generates a plot of the solution to a given model over a specified time period.
 *
 * @param {Model} model - The model to solve and plot.
 * @param {number} time - The time period to plot the solution for.
 * @param {number} [stepSize=0.1] - The step size to use in the numerical solver. Defaults to 0.1.
 * @return {http.Server} The server object that is listening on port 3000.
 */
const plot = async (
    model: Model,
    time: number,
    stepSize: number = 0.1
): http.Server => {
    const solution = solve(model, time, stepSize)

    const plotlyData: {
        x: number[]
        y: number[]
        name: string
        mode: string
    }[] = []
    for (const compartment in solution) {
        plotlyData.push({
            x: Array.from(Array(time + 1).keys()),
            y: solution[compartment],
            name: model.compartments[compartment].name,
            mode: 'lines'
        })
    }

    const server = http.createServer((req, res) => {
        // Send the plot as HTML
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`<!DOCTYPE html>
        <html>
        <head>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        </head>
        <body>
        <div id="plot"></div>
        <script>
        let data = ${JSON.stringify(plotlyData)}
        let layout = {
            title: 'Compartment Population vs. Time',
            xaxis: {
                title: 'Time'
            },
            yaxis: {
                title: 'Compartment Population'
            }
        }
        Plotly.newPlot('plot', data, layout)
        </script>
        </body>
        </html>`)
        res.end()
    })

    server.listen(3000)

    console.log('Server running at http://localhost:3000')

    return server
}

export default plot
