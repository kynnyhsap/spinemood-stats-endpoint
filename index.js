import fastify from 'fastify'
import * as CSV from 'csv-string'

import { parseISO } from "date-fns";
import { buildTimeseriesChart } from "./chart.js";


const app = fastify({ logger: true })

/*
 * Get dynamic quickchart.js image URL from spinemood records
 */
app.post('/', async (request, reply) => {
    const parsedCsvData = CSV.parse(request.body)
        .slice(1) // removing first line

    const records = parsedCsvData.map((row) => {
        const score = Number(row[0])
        const createdAt = parseISO(row[1])

        return { score, createdAt, old: row[1] }
    })

    const chart = buildTimeseriesChart(records)

    return chart.getUrl()
})

app.get('/', () => {
    return 'ok'
})



const start = async () => {
    try {
        await app.listen(process.env.PORT || 3333, process.env.HOST || '0.0.0.0')
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()