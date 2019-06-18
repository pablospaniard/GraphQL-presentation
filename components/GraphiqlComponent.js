import React from 'react'
import 'node_modules/graphiql/graphiql.css'
import GraphiQL from 'graphiql'

const graphQLFetcher = async graphQLParams => {
    return fetch('https://metaphysics-production.artsy.net/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLParams)
    }).then(response => response.json())
}

const GraphiqlComponent = () => {
    return (
        <div style={{ width: '100vw', height: '100vh ' }}>
            <GraphiQL fetcher={graphQLFetcher} className="graphiql" />
        </div>
    )
}

export default GraphiqlComponent
