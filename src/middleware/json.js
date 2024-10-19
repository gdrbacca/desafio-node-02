export async function json(req, res){
    const buffers = []

    for await (const dd of req){
        buffers.push(dd)
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    } 

    res.setHeader('Content-Type', 'application/json')
}