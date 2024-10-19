import fs from 'node:fs'
import { parse } from 'csv-parse'

const databasePath = new URL('../../tasks.csv', import.meta.url)


export async function ReadCSV(){
    const data = fs.readFileSync(databasePath, {encoding: 'utf8'})
    const records = parse(data, {bom: true})

    let count = 0
    for await (const record of records) {
        
        if (count === 0) 
        {
            count++
            continue
        }

        if (record.lenght < 2) {
            arrayRecords = []
            //console.log('deu ruim')
            return arrayRecords
        }
        const [title, description] = record
        
        fetch('http://localhost:3334/task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                description
            })
        })
        
        // Fake asynchronous operation
        // await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

ReadCSV()