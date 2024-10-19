
export function SearchForQuery(query) {
    const corrected = query.substring(1).replace("%20", " ")
    const sliced = corrected.split('&')
    const queryFinal = {}
    sliced.map(slice => {
        const [key, value] = slice.split("=")
        queryFinal[key] = value
    })

    return queryFinal
}