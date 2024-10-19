import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'
import { SearchForQuery } from './utils/search-for-query.js'

const server = http.createServer(async (req, res) => {
    const {method, url} = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const params = url.match(route.path)

        if (params.groups.query)
            req.query = SearchForQuery(params.groups.query)
        console.log(url)
        console.log(method)
        console.log(req.body)
        console.log({...params})
        req.params = {...params.groups}
        return route.handler(req, res)

    }

    


    return res.writeHead(200).end()
})

server.listen(3334)