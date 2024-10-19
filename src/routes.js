import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { randomUUID } from 'node:crypto'

const db = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/task'),
        handler: (req, res) => {
            const tasks = db.select('task', req.query)
            console.log(req.query)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/task'),
        handler: (req, res) => {
            const body = req.body
            db.insert('task', {
                id: randomUUID(),
                created_at: new Date(),
                updated_at: "",
                completed_at: "",
                ...body
            })
            return res.writeHead(201).end("Created")
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const body = req.body
            console.log(body)
            const id = req.params.id
            const response = db.update('task', id, body)

            if (!response)
                return res.writeHead(404).end("ID not found")
            else
                return res.writeHead(201).end("Updated")
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/task/:id'),
        handler: (req, res) => {
            const id = req.params.id
            const response = db.delete('task', id)

            if (!response)
                return res.writeHead(404).end("ID not found")
            else
                return res.writeHead(201).end("Deleted")
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/task/:id/complete'),
        handler: (req, res) => {
            const id = req.params.id
            const response = db.patch('task', id)

            if (!response)
                return res.writeHead(404).end("ID not found")
            else
                return res.writeHead(201).end("Completed")
        }
    }
]