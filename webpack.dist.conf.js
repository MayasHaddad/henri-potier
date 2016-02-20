/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict'
var webpack = require('webpack')

module.exports = {

    entry: './src/main.js',

    output: {
        filename: 'dist/index.js'
    },

    eslint: {
        configFile: '.eslintrc'
    },

    module: {
        preLoaders: [{
            test: /\.(js)$/,
            exclude: /node_modules|dist/,
            loader: 'eslint-loader'
        }],
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.html$/, loader: "raw-loader" }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            Backbone: "backbone",
            _: "underscore"
        }),
        new webpack.optimize.UglifyJsPlugin({ "minify": true })
    ]
}