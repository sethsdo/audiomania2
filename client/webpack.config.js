const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            // {test: /\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.sass$/, use: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader?indentedSyntax'] }
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            // "/users": {
            //     target: "http://localhost:1337",
            // },
            // "/authenticate": {
            //     target: "http://localhost:1337",
            // },
            "/api": {
                target: "http://localhost:1337",
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}