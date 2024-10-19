import fs from 'node:fs'

const databasePath = new URL('../db.json', import.meta.url)
export class Database {
    #database = {}

    constructor() {
        try {
            this.#database = JSON.parse(fs.readFileSync(databasePath, {encoding: 'utf-8'}))
        } catch (e) {
            this.#persist()
        }
    } 

    #persist(){
        fs.writeFileSync(databasePath, JSON.stringify(this.#database))
    }

    select(table, query){
        const data = this.#database[table]
        if (!Array.isArray(data))
            return []

        if (query){
            const some = data.filter(row => {
                return (query.title && row.title.toLowerCase().includes(query.title.toLowerCase())) || 
                (query.description && row.description.toLowerCase().includes(query.description.toLowerCase()))
            })
            return some
        }
        else 
            return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
            
            //console.log(data)
            this.#persist()
        }
        else {
            this.#database[table] = [data]
            this.#persist()
        }
    }

    update(table, id, body){
        if (Array.isArray(this.#database[table])) {
            const index = this.#database[table].findIndex(reg => {
                //console.log(reg.id)
                return reg.id === id
            })
            //console.log('index: '+index)
            if (index >= 0) {
                const bodyFound = this.#database[table][index]
                
                if (body.title)
                    bodyFound.title = body.title
                if (body.description)
                    bodyFound.description = body.description

                bodyFound.updated_at = new Date()
                this.#database[table][index] = {
                    id,
                    ...bodyFound
                }

                this.#persist()
                return true
            }
            return false
        }
        return false
    }

    delete(table, id) {
        if (!Array.isArray(this.#database[table])){
            return false
        }
        const lenght = this.#database[table].lenght

        const filteredArray = this.#database[table].filter(row => {
            return row.id !== id
        })

        if (filteredArray.length === lenght) {
            return false
        }

        this.#database[table] = filteredArray
        this.#persist()

        return true
    }

    patch(table, id) {
        if (!Array.isArray(this.#database[table])){
            return false
        }

        const index = this.#database[table].findIndex(row => {
            return row.id === id
        })

        if (index >= 0) {
            const data =  this.#database[table][index]

            data.updated_at = ""
            data.completed_at = new Date()

            this.#database[table][index] = {
                id,
                ...data
            }
            this.#persist()

            return true
        }
        else
            return false
    }
}