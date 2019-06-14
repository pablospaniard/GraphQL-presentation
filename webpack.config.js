module.exports = {
    // ...
    module: {
        rules: [
            // or "loaders" for webpack 1.x
            { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.js/, // assuming the files are named .js.flow
                enforce: 'pre',
                use: ['remove-flow-types-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.mjs', '.js', '.json']
    }
}
