export const graphQLFetcher = async graphQLParams => {
    return fetch('https://metaphysics-production.artsy.net/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLParams)
    }).then(response => response.json())
}
