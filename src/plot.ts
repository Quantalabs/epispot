import { Model } from './model.js'
import solve from './solve.js'
import http from 'http'

const plot = async (model: Model, time: number) => {
    const solution = solve(model, time)

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
